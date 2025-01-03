'use client'

import { useState } from 'react'
import { Leaf, Home, Moon, Gift, Settings, Maximize2, Music2, PlayCircle, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SettingsPanel } from './settings-panel'

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
    switch (currentTheme) {
      case 'ethereal-purple':
        return {
          background: 'bg-[radial-gradient(circle_at_top_left,_#663399,_#87CEEB,_#FFB6C1,_#FFFDD0)]',
          video: null
        }
      case 'purple-yellow-orange':
        return {
          background: 'bg-[radial-gradient(circle_at_top_left,_purple,_yellow,_orange)]',
          video: null
        }
      case 'white-black-gray':
        return {
          background: 'bg-[radial-gradient(circle_at_top_left,_white,_black,_gray)]',
          video: null
        }
      case 'orange-yellow-green':
        return {
          background: 'bg-[radial-gradient(circle_at_top_left,_orange,_yellow,_green)]',
          video: null
        }
      case 'minimalist-black':
        return {
          background: 'none',
          video: '/bg/vid-1.mp4'
        }
      case 'aura-twilight':
        return {
          background: 'bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500',
          video: null
        }
      case 'peach-aura':
        return {
          background: 'bg-gradient-to-br from-pink-300 via-red-300 to-pink-400',
          video: null
        }
      case 'light-pink':
        return {
          background: 'bg-gradient-to-br from-pink-400 to-pink-200',
          video: null
        }
      case 'lava-lamp':
        return {
          background: 'bg-gradient-to-br from-purple-600 via-red-500 to-orange-500',
          video: null
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

  return (
    <>
      <div className={cn(
        'min-h-screen w-full relative overflow-hidden transition-colors duration-500',
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
            <h1 className="text-2xl font-bold text-white">（*＾-＾*）</h1>
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
            <div className="fixed bottom-24 left-6 z-20 flex items-center gap-2">
              <button className="p-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-lg rounded-full">
                <Music2 className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-lg rounded-full p-2">
                <button className="text-white/80 hover:text-white transition-colors">
                  <PlayCircle className="w-5 h-5" />
                </button>
                <div className="h-4 w-px bg-white/20" />
                <button className="text-white/80 hover:text-white transition-colors">
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

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
