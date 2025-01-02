import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface FocusModeProps {
  name: string;
}

export function FocusMode({ name }: FocusModeProps) {
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setTime(25 * 60)
    setIsActive(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-white text-4xl font-bold mb-8">
        Focus Time, {name}!
      </h2>
      <div className="text-white text-[8rem] font-bold tracking-tight mb-8">
        {formatTime(time)}
      </div>
      <div className="flex gap-4">
        <Button
          onClick={toggleTimer}
          className="bg-white text-black hover:bg-white/90"
        >
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button
          onClick={resetTimer}
          variant="outline"
          className="text-white border-white hover:bg-white/10"
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

