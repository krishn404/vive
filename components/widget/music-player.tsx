'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import gsap from 'gsap'
import Image from 'next/image'
import { Track } from '@/lib/vibe-drx'
import { fetchMusicData } from '@/lib/vibe-drx'

export function MusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const musicData = await fetchMusicData()
        if (musicData.length > 0) {
          setTracks(musicData)
          setCurrentTrack(musicData[0])
          setError(null)
        } else {
          setError('No lofi study tracks found')
        }
      } catch (error) {
        console.error('Failed to load tracks:', error)
        setError('Failed to load lofi study tracks. Please try again later.')
        setTracks([])
        setCurrentTrack(null)
      }
    }
    loadTracks()
  }, [])

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      const highestQualityUrl = currentTrack.downloadUrl.reduce((prev, current) => {
        return (parseInt(prev.quality) > parseInt(current.quality)) ? prev : current;
      }).url;
      
      // Store current time before changing source
      const previousTime = audioRef.current.currentTime;
      
      audioRef.current.src = highestQualityUrl
      
      // After setting new source, set the time and play if needed
      audioRef.current.addEventListener('loadedmetadata', () => {
        audioRef.current!.currentTime = previousTime;
        if (isPlaying) {
          audioRef.current!.play().catch(e => {
            console.error('Error playing audio:', e)
            setError('Error playing audio. Please try again.')
          })
        }
      }, { once: true })
    }
  }, [currentTrack, isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const updateProgress = () => {
        setCurrentTime(audio.currentTime)
        setDuration(audio.duration)
        const value = (audio.currentTime / audio.duration) * 100
        gsap.to(progressRef.current, {
          scaleX: value / 100,
          duration: 0.1,
          ease: "none"
        })
      }
      
      const animationFrame = () => {
        if (!audio.paused) {
          updateProgress()
        }
        requestAnimationFrame(animationFrame)
      }
      
      const animationId = requestAnimationFrame(animationFrame)
      
      audio.addEventListener('timeupdate', updateProgress)
      
      return () => {
        cancelAnimationFrame(animationId)
        audio.removeEventListener('timeupdate', updateProgress)
      }
    }
  }, [])

  useEffect(() => {
    if (playerRef.current) {
      gsap.to(playerRef.current, {
        height: isHovered ? '240px' : '80px',
        duration: 0.3,
        ease: 'power2.inOut'
      })
    }
  }, [isHovered])

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        // Ensure we set the current time before playing
        audioRef.current.currentTime = currentTime
        audioRef.current.play().catch(e => {
          console.error('Error playing audio:', e)
          setError('Error playing audio. Please try again.')
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const playNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (tracks.length > 0 && currentTrack) {
      const currentIndex = tracks.findIndex(track => track.id === currentTrack.id)
      const nextIndex = (currentIndex + 1) % tracks.length
      setCurrentTrack(tracks[nextIndex])
    }
  }

  const playPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (tracks.length > 0 && currentTrack) {
      const currentIndex = tracks.findIndex(track => track.id === currentTrack.id)
      const previousIndex = (currentIndex - 1 + tracks.length) % tracks.length
      setCurrentTrack(tracks[previousIndex])
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && !isNaN(duration) && duration > 0) {
      const progressBar = e.currentTarget;
      const bounds = progressBar.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const width = bounds.width;
      const percentage = x / width;
      const newTime = percentage * duration;
      
      // Update audio time
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      
      // Update progress bar immediately
      gsap.to(progressRef.current, {
        scaleX: percentage,
        duration: 0.1,
        ease: "none"
      });
    }
  }

  return (
    <div 
      ref={playerRef}
      className="fixed bottom-8 left-6 z-20 h-20 bg-purple-900/95 rounded-[28px] overflow-hidden transition-all duration-300 ease-in-out"
      style={{ 
        width: '350px',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio
        ref={audioRef}
        onEnded={() => playNext()}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          console.error('Audio error:', e)
          setError('Error playing audio. Please try another track.')
        }}
      />
      
      <div className="relative w-full h-full">
        {!isHovered ? (
          // Collapsed view
          <div className="flex items-center h-full gap-4 p-4">
            {currentTrack && (
              <Image 
                src={currentTrack.image[0].url} 
                alt={currentTrack.name} 
                width={48}
                height={48}
                className="rounded-2xl"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-sm font-medium truncate">{currentTrack?.name}</h3>
              <p className="text-white/60 text-xs truncate">{currentTrack?.artists.primary[0]?.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={togglePlay}
                className="text-white hover:text-white/80 transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>
          </div>
        ) : (
          // Expanded view
          <div className="flex h-full">
            {/* Left side - Album Art  */}
            {currentTrack && (
              <div className="w-[50%] h-full p-3">
                <Image 
                  src={currentTrack.image[0].url} 
                  alt={currentTrack.name} 
                  width={200}
                  height={200}
                  className="rounded-2xl object-cover w-full h-full"
                />
              </div>
            )}
            
            {/* Right side - Track Info and Controls  */}
            <div className="w-[50%] flex flex-col justify-center px-6 py-4">
              {/* Track Info */}
              <div className="mb-6 overflow-hidden">
                <h3 className="text-white text-xl font-semibold mb-1 truncate hover:whitespace-normal hover:text-clip">
                  {currentTrack?.name}
                </h3>
                <p className="text-white/70 text-lg truncate hover:whitespace-normal hover:text-clip">
                  {currentTrack?.artists.primary[0]?.name}
                </p>
              </div>
              
              {/* Controls and Progress */}
              <div className="space-y-4">

                {/* Playback controls */}
                <div className="flex justify-between items-center">
                  <button 
                    onClick={playPrevious}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    <SkipBack size={28} />
                  </button>
                  <button 
                    onClick={togglePlay}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    {isPlaying ? <Pause size={36} /> : <Play size={36} />}
                  </button>
                  <button 
                    onClick={playNext}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    <SkipForward size={28} />
                  </button>
                </div>
                {/* Progress bar */}
                  <div 
                    className="relative w-full h-1 bg-white/10 rounded-full mb-2 cursor-pointer"
                    onClick={handleProgressBarClick}
                  >
                    <div 
                      ref={progressRef}
                      className="absolute top-0 left-0 h-full bg-white/80 rounded-full origin-left"
                      style={{ 
                        width: `${(currentTime / duration) * 100 || 0}%`,
                        transition: 'width 0.1s linear'
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>{formatTime(currentTime)}</span>
                    <span>-{formatTime(isNaN(duration) ? 0 : duration - currentTime)}</span>
                  </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="absolute bottom-full left-0 mb-2 bg-red-500/80 text-white px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
    </div>
  )
}