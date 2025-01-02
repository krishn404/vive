'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { gradientThemes, ambientThemes } from '@/lib/gradient-themes'
import Image from 'next/image'
import { useState } from 'react'

interface StepThreeProps {
  onBack: () => void
  onComplete: (theme: string) => void
}

export function StepThree({ onBack, onComplete }: StepThreeProps) {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    onComplete(themeId);
  };

  const getBackgroundStyle = () => {
    if (selectedTheme) {
      if (selectedTheme in gradientThemes) {
        return gradientThemes[selectedTheme as keyof typeof gradientThemes].background;
      }
      return '';
    }
    return '';
  };

  return (
    <Card className={`w-full max-w-4xl mx-auto bg-black/30 backdrop-blur-xl border-0 ${getBackgroundStyle()}`}>
      <div className="p-8">
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h2 className="text-3xl font-bold text-white mb-8">
          Lastly, let&apos;s pick your theme
        </h2>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">
              Gradients & Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(gradientThemes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => handleThemeSelect(key)}
                  className={`aspect-video rounded-lg hover:ring-2 ring-white/50 transition-all ${theme.background}`}
                />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">
              Ambient Worlds
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {ambientThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  className={`relative aspect-video rounded-lg overflow-hidden hover:ring-2 ring-white/50 transition-all ${
                    selectedTheme === theme.id ? 'animate-bg' : ''
                  }`}
                >
                  <Image
                    src={theme.image}
                    alt={theme.name}
                    fill
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            onClick={() => onComplete('default')}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Finish
          </Button>
        </div>
      </div>
    </Card>
  )
}

