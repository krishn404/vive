'use client'

import { useState } from 'react'

const QUOTES = [
  "The secret of getting ahead is getting started.",
  "Believe you can and you're halfway there.",
  "It always seems impossible until it's done.",
  "Don't watch the clock; do what it does. Keep going.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
]

export function Timer() {
  const [quote] = useState(QUOTES[0])

  return (
    <div>
      <p className="text-white/80 text-xl max-w-2xl">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  )
}

