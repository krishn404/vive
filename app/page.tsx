'use client'

import { useState } from 'react'
import { Layout, Mode } from '@/components/layout'
import { StepOne } from '../components/onboarding/step-one'
import { StepTwo } from '../components/onboarding/step-two'
import { StepThree } from '../components/onboarding/step-three'
import { HomeMode } from '@/components/home-mode'
import { FocusMode } from '@/components/focus-mode'
import { AmbientMode } from '@/components/ambient-mode'

export default function Home() {
  const [step, setStep] = useState(1)
  const [isOnboarded, setIsOnboarded] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    theme: ''
  })
  const [currentMode, setCurrentMode] = useState<Mode>('home')

  const handleStepOne = (name: string) => {
    setUserData(prev => ({ ...prev, name }))
    setStep(2)
  }

  const handleStepTwo = (email: string) => {
    setUserData(prev => ({ ...prev, email }))
    setStep(3)
  }

  const handleStepThree = (theme: string) => {
    setUserData(prev => ({ ...prev, theme }))
    setIsOnboarded(true)
  }

  if (!isOnboarded) {
    return (
      <Layout onModeChange={setCurrentMode} className="flex items-center justify-center p-4" isOnboarding={true}>
        {step === 1 && <StepOne onNext={handleStepOne} />}
        {step === 2 && (
          <StepTwo 
            onBack={() => setStep(1)} 
            onNext={handleStepTwo}
          />
        )}
        {step === 3 && (
          <StepThree
            onBack={() => setStep(2)}
            onComplete={handleStepThree}
          />
        )}
      </Layout>
    )
  }

  return (
    <Layout onModeChange={setCurrentMode} isOnboarding={false}>
      {currentMode === 'home' && <HomeMode name={userData.name} />}
      {currentMode === 'focus' && <FocusMode name={userData.name} />}
      {currentMode === 'ambient' && <AmbientMode />}
    </Layout>
  )
}

