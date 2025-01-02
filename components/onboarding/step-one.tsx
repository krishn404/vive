'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface StepOneProps {
  onNext: (name: string) => void
}

export function StepOne({ onNext }: StepOneProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onNext(name)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen"
    >
      <Card className="w-full max-w-md mx-auto bg-black/30 backdrop-blur-xl border-0">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Get ready to get more done
          </h2>
          <p className="text-white/80 mb-6">Let&apos;s start with your name</p>
          
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="First name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/10 border-0 text-white placeholder:text-white/50 mb-4"
            />
            <Button 
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Continue
            </Button>
            <p className="text-center text-white/60 text-sm mt-2">
              or press enter
            </p>
          </form>
        </div>
      </Card>
    </motion.div>
  )
}

