'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { newThemes } from '@/lib/gradient-themes'

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
    const theme = newThemes.find(t => t.value === selectedTheme);
    return theme ? theme.gradient : '';
  };

  return (
    <Card style={{ backgroundImage: getBackgroundStyle() }} className={`w-full max-w-4xl mx-auto bg-black/30 backdrop-blur-xl border-0`}>
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
              New Themes
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newThemes.map((theme) => (
                <button style={{ backgroundImage: theme.gradient }}
                  key={theme.value}
                  onClick={() => handleThemeSelect(theme.value)}
                  className={`aspect-video rounded-lg hover:ring-2 ring-white/50 transition-all ${theme.gradient}`}
                >
                  <span className="absolute bottom-2 left-2 text-sm text-white font-medium">
                    {/* {theme.name} */}
                  </span>
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