'use client'

import { X, Home, Moon, Leaf, Clock, Timer, BarChart2, Music2, Volume2, Quote, Sparkles, User, HelpCircle, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { customThemes } from '@/lib/gradient-themes'
import { useEffect } from 'react'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  onThemeChange?: (theme: string) => void
  currentTheme?: string
}

const menuItems = [
  { icon: Home, label: 'Home Theme', isActive: true },
  { icon: Moon, label: 'Focus Theme' },
  { icon: Leaf, label: 'Ambient Theme' },
  { icon: Clock, label: 'Clock' },
  { icon: Timer, label: 'Focus Timer' },
  { icon: BarChart2, label: 'Stats' },
  { icon: Music2, label: 'Music' },
  { icon: Volume2, label: 'Sounds', badge: 'New' },
  { icon: Quote, label: 'Quotes' },
  { icon: Sparkles, label: 'Extras' },
  { icon: User, label: 'Profile' },
  { icon: HelpCircle, label: 'Support & Feedback' },
]

export function SettingsPanel({ isOpen, onClose, onThemeChange, currentTheme }: SettingsPanelProps) {
  useEffect(() => {
    // Add the animation styles when the component mounts
    const style = document.createElement('style')
    style.innerHTML = `
      @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative flex w-full max-w-[1200px] mx-auto">
        {/* Sidebar */}
        <div className="w-64 bg-black border-r border-white/10">
          <ScrollArea className="h-screen">
            <div className="p-4 space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm",
                    "hover:bg-white/10 transition-colors",
                    item.isActive && "bg-white/10"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-white">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-xs bg-emerald-500/20 text-emerald-500 px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="p-4">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Zap className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-black">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Home Theme</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <ScrollArea className="h-[calc(100vh-65px)]">
            <div className="p-6">
              <p className="text-white/60 mb-6">
                Pick your theme to appear in Home. To see a live preview, ensure your
                dashboard toggle is set to Home, then come back to this Settings tab.
              </p>

              {/* Themes Grid */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Gradients & Colors</h3>
                <div className="grid grid-cols-2 gap-4">
                  {customThemes.map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => onThemeChange?.(theme.value)}
                      className={cn(
                        "relative aspect-video rounded-lg overflow-hidden",
                        "hover:ring-2 ring-white/50 transition-all",
                        currentTheme === theme.value && "ring-2 ring-white"
                      )}
                    >
                      {theme.video ? (
                        <video
                          className="w-full h-full object-cover"
                          src={theme.video}
                          autoPlay
                          loop
                          muted
                        />
                      ) : (
                        <div 
                          className="w-full h-full"
                          style={{
                            background: theme.gradient,
                            ...(theme.isAnimated && {
                              backgroundSize: '400% 400%',
                              animation: 'gradientAnimation 15s ease infinite'
                            })
                          }}
                        />
                      )}
                      {theme.isAnimated && (
                        <span className="absolute top-2 right-2 text-xs bg-purple-600 text-white px-2 py-1 rounded">
                          ANIMATED
                        </span>
                      )}
                      <span className="absolute bottom-2 left-2 text-sm text-white font-medium">
                        {theme.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

