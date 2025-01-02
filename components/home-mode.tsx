import { useState, useEffect } from 'react'

interface HomeModeProps {
  name: string;
}

const GREETINGS = [
  "Good morning",
  "Good afternoon",
  "Good evening",
  "Hello",
  "Welcome back",
]

const QUOTES = [
  "The secret of getting ahead is getting started.",
  "Believe you can and you're halfway there.",
  "It always seems impossible until it's done.",
  "Don't watch the clock; do what it does. Keep going.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
]

export function HomeMode({ name }: HomeModeProps) {
  const [time, setTime] = useState(new Date())
  const [greeting, setGreeting] = useState(GREETINGS[0])
  const [quote, setQuote] = useState(QUOTES[0])

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const hours = time.getHours()
    if (hours < 12) setGreeting("Good morning")
    else if (hours < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [time])

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)])
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      
      <h2 className="text-white text-4xl font-bold mb-4">
        {greeting}, {name}!
      </h2>
      <div className="text-white text-[8rem] font-bold tracking-tight mb-8">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <p className="text-white/80 text-xl max-w-2xl">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  )
}

