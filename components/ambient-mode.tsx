import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Volume2, VolumeX } from 'lucide-react'

const AMBIENT_SOUNDS = [
  { name: 'Rain', icon: '🌧️' },
  { name: 'Forest', icon: '🌳' },
  { name: 'Waves', icon: '🌊' },
  { name: 'Fireplace', icon: '🔥' },
  { name: 'White Noise', icon: '🔊' },
]

export function AmbientMode() {
  const [activeSound, setActiveSound] = useState<string | null>(null)

  const toggleSound = (sound: string) => {
    if (activeSound === sound) {
      setActiveSound(null)
    } else {
      setActiveSound(sound)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-white text-4xl font-bold mb-8">
        Ambient Sounds
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {AMBIENT_SOUNDS.map((sound) => (
          <Button
            key={sound.name}
            onClick={() => toggleSound(sound.name)}
            className={`text-white border-white hover:bg-white/10 text-lg ${
              activeSound === sound.name ? 'bg-white/20' : ''
            }`}
            variant="outline"
          >
            <span className="mr-2">{sound.icon}</span>
            {sound.name}
            {activeSound === sound.name && (
              <Volume2 className="ml-2 h-4 w-4" />
            )}
            {activeSound !== sound.name && (
              <VolumeX className="ml-2 h-4 w-4" />
            )}
          </Button>
        ))}
      </div>
      <p className="text-white/80 text-xl">
        Create your perfect ambient environment
      </p>
    </div>
  )
}

