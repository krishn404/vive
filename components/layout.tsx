'use client'

import { useState, useEffect } from 'react'
import { Leaf, Home, Moon, Gift, Settings, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SettingsPanel } from './settings-panel'
import { newThemes } from '@/lib/gradient-themes'
import { fetchMusicData } from '@/lib/vibe-drx'
import { MusicPlayer } from './widget/music-player'

interface LayoutProps {
  children: React.ReactNode
  className?: string
  onModeChange: (mode: Mode) => void
  isOnboarding: boolean
  currentTheme: string
  onThemeChange?: (theme: string) => void
}

export type Mode = 'home' | 'focus' | 'ambient'

export function Layout({ children, className, onModeChange, isOnboarding, currentTheme, onThemeChange }: LayoutProps) {
  const [currentMode, setCurrentMode] = useState<Mode>('home')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleThemeChange = (theme: string) => {
    onThemeChange?.(theme)
  }

  const getThemeClasses = () => {
    const theme = newThemes.find(t => t.value === currentTheme);
    
    if (theme) {
      return {
        background: theme.gradient,
        video: null
      };
    }

    // Fallback or special cases
    switch (currentTheme) {
      case 'minimalist-black':
        return {
          background: 'none',
          video: '/bg/vid-1.mp4'
        }
      default:
        return {
          background: 'bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500',
          video: null
        }
    }
  }

  const theme = getThemeClasses()

  const handleModeChange = (mode: Mode) => {
    setCurrentMode(mode);
    onModeChange(mode);
  };

  const handleMusicFetch = async () => {
    try {
      const musicData = await fetchMusicData();
      console.log(musicData); // Handle the music data as needed
    } catch (error) {
      console.error('Failed to fetch music data:', error);
    }
  };

  useEffect(() => {
    handleMusicFetch();
  }, []);

  return (
    <> 
      <div style={{ backgroundImage: theme.background }} className={cn(
        'min-h-screen w-full relative overflow-hidden transition-colors duration-500 ',
        theme.background, 
        className
      )}>
        {theme.video && (
          <div className="fixed inset-0 w-full h-full object-cover bg-no-repeat overflow-hidden -z-10">
            <video
              autoPlay
              muted
              playsInline
              className="absolute top-0 left-0 w-full bg-no-repeat h-full object-cover"
            >
              <source src={theme.video} type="video/mp4" />
            </video>
          </div>
        )}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Logo */}
        <header className="absolute top-0 left-0 z-10 p-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">Vive</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 pb-32">
          {children}
        </main>

        {/* Conditionally render Music Player Footer and Bottom Navigation */}
        {!isOnboarding && (
          <>
            {/* Music Player Footer */}
            <MusicPlayer />

            {/* Bottom Navigation */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
              {/* Left grouped buttons */}
              <div className="flex items-center bg-black/20 backdrop-blur-lg rounded-full p-2">
                <button 
                  onClick={() => handleModeChange('ambient')}
                  className={cn(
                    "p-2 transition-colors rounded-full",
                    currentMode === 'ambient' ? "text-white bg-white/10" : "text-white/80 hover:text-white"
                  )}
                >
                  <Leaf className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleModeChange('home')}
                  className={cn(
                    "p-2 transition-colors rounded-full",
                    currentMode === 'home' ? "text-white bg-white/10" : "text-white/80 hover:text-white"
                  )}
                >
                  <Home className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleModeChange('focus')}
                  className={cn(
                    "p-2 transition-colors rounded-full",
                    currentMode === 'focus' ? "text-white bg-white/10" : "text-white/80 hover:text-white"
                  )}
                >
                  <Moon className="w-5 h-5" />
                </button>
              </div>

              {/* Right buttons */}
              <div className="flex items-center gap-2">
                <button className="p-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-lg rounded-full">
                  <Gift className="w-5 h-5" />
                </button>
                <button 
                  className="p-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-lg rounded-full"
                  onClick={() => setIsSettingsOpen(true)}
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button className="p-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-lg rounded-full">
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </nav>
          </>
        )}
      </div>

      <SettingsPanel 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onThemeChange={handleThemeChange}
        currentTheme={currentTheme}
      />
    </>
  )
}

