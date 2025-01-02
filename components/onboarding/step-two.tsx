'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft } from 'lucide-react'

interface StepTwoProps {
  onBack: () => void
  onNext: (email: string, password: string) => void
}

export function StepTwo({ onBack, onNext }: StepTwoProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    onNext(email, password)
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-black/30 backdrop-blur-xl border-0">
      <div className="p-8">
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h2 className="text-3xl font-bold text-white mb-2">
          Keep your dashboard yours
        </h2>
        <p className="text-white/80 mb-6">
          Personalize and save your Flocus setup for peak productivity ✨
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="name@example.com"
            className="bg-white/10 border-0 text-white placeholder:text-white/50 mb-4"
          />
          <Input
            type="password"
            name="password"
            placeholder="create password"
            className="bg-white/10 border-0 text-white placeholder:text-white/50 mb-4"
          />
          
          <div className="flex items-start space-x-2 mb-6">
            <Checkbox id="newsletter" />
            <label
              htmlFor="newsletter"
              className="text-sm text-white/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Subscribe to our weekly productivity newsletter, The Flow.
            </label>
          </div>

          <Button 
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Continue
          </Button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => onNext('', '')} 
            className="text-white/60 hover:text-white text-sm"
          >
            Skip and go to dashboard →
          </button>
        </div>
      </div>
    </Card>
  )
}

