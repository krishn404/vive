'use client'

import { X, Home, Moon, Leaf, Clock, Timer, BarChart2, Music2, Volume2, Quote, Sparkles, User, HelpCircle, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  onThemeChange: (theme: string) => void
  currentTheme: string
}

const themes = [
  {
    name: 'Aura Twilight',
    preview: '/placeholder.svg?height=120&width=200',
    value: 'aura-twilight',
    gradient: 'bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500'
  },
  {
    name: 'Peach Aura Heart',
    preview: '/placeholder.svg?height=120&width=200',
    value: 'peach-aura',
    gradient: 'bg-gradient-to-br from-pink-300 via-red-300 to-pink-400'
  },
  {
    name: 'Light Pink Heart',
    preview: '/placeholder.svg?height=120&width=200',
    value: 'light-pink',
    gradient: 'bg-gradient-to-br from-pink-400 to-pink-200',
    isPremium: true
  },
  {
    name: 'Lava Lamp',
    preview: '/placeholder.svg?height=120&width=200',
    value: 'lava-lamp',
    gradient: 'bg-gradient-to-br from-purple-600 via-red-500 to-orange-500',
    isAnimated: true
  },
  {
    name: 'Minimalist Black',
    preview: '/bg/vid-1.mp4',
    value: 'minimalist-black',
    video: '/bg/vid-1.mp4',
    gradient: undefined
  }
]

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

              {/* Filters */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div>
                  <label className="text-sm text-white mb-2 block">Type</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="gradient">Gradient</SelectItem>
                      <SelectItem value="solid">Solid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-white mb-2 block">Environment</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-white mb-2 block">Brightness</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="bright">Bright</SelectItem>
                      <SelectItem value="dim">Dim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-white mb-2 block">Color</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="pink">Pink</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Themes Grid */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Gradients & Colors</h3>
                <div className="grid grid-cols-3 gap-4">
                  {themes.map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => onThemeChange(theme.value)}
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
                        <div className={cn("w-full h-full", theme.gradient)} />
                      )}
                      {theme.isPremium && (
                        <span className="absolute top-2 right-2 text-xs bg-purple-600 text-white px-2 py-1 rounded">
                          PLUS
                        </span>
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

