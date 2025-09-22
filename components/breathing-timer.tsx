"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BreathingTimerProps {
  inhale: number
  hold1: number
  exhale: number
  hold2: number
  instructions: string
}

type Phase = "inhale" | "hold1" | "exhale" | "hold2"

const phaseLabels = {
  inhale: "Breathe In",
  hold1: "Hold",
  exhale: "Breathe Out",
  hold2: "Hold",
}

const phaseColors = {
  inhale: "from-blue-400 to-cyan-400",
  hold1: "from-purple-400 to-indigo-400",
  exhale: "from-green-400 to-emerald-400",
  hold2: "from-orange-400 to-yellow-400",
}

export function BreathingTimer({ inhale, hold1, exhale, hold2, instructions }: BreathingTimerProps) {
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<Phase>("inhale")
  const [timeLeft, setTimeLeft] = useState(inhale)
  const [cycle, setCycle] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const phases = { inhale, hold1, exhale, hold2 }
  const phaseOrder: Phase[] = ["inhale", "hold1", "exhale", "hold2"]

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            const currentIndex = phaseOrder.indexOf(currentPhase)
            const nextIndex = (currentIndex + 1) % phaseOrder.length
            const nextPhase = phaseOrder[nextIndex]

            setCurrentPhase(nextPhase)

            // If we completed a full cycle
            if (nextPhase === "inhale") {
              setCycle((c) => c + 1)
            }

            // Play sound if enabled
            if (soundEnabled) {
              playBreathingSound(nextPhase)
            }

            return phases[nextPhase]
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, currentPhase, soundEnabled])

  const playBreathingSound = (phase: Phase) => {
    // Simple audio feedback using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Different frequencies for different phases
    const frequencies = {
      inhale: 440,
      hold1: 523,
      exhale: 349,
      hold2: 392,
    }

    oscillator.frequency.setValueAtTime(frequencies[phase], audioContext.currentTime)
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1)
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setCurrentPhase("inhale")
    setTimeLeft(inhale)
    setCycle(0)
  }

  const progress = ((phases[currentPhase] - timeLeft) / phases[currentPhase]) * 100

  return (
    <Card className="glass">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
          <span>Box Breathing Exercise</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{instructions}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Breathing Circle */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            {/* Background circle */}
            <div className="absolute inset-0 rounded-full border-4 border-muted-foreground/20" />

            {/* Progress circle */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className={`text-transparent`}
              />
              <motion.circle
                cx="96"
                cy="96"
                r="88"
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                transition={{ duration: 0.1 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className={`stop-color-blue-400`} />
                  <stop offset="100%" className={`stop-color-purple-400`} />
                </linearGradient>
              </defs>
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhase}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-foreground">{timeLeft}</div>
                  <div className="text-sm font-medium text-muted-foreground mt-1">{phaseLabels[currentPhase]}</div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Breathing animation */}
            <motion.div
              className={`absolute inset-4 rounded-full bg-gradient-to-br ${phaseColors[currentPhase]} opacity-20`}
              animate={{
                scale: currentPhase === "inhale" ? [1, 1.2] : currentPhase === "exhale" ? [1.2, 1] : 1,
              }}
              transition={{
                duration: phases[currentPhase],
                ease: "easeInOut",
                repeat: isActive ? Number.POSITIVE_INFINITY : 0,
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-8 text-center">
          <div>
            <div className="text-2xl font-bold text-foreground">{cycle}</div>
            <div className="text-sm text-muted-foreground">Cycles</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {Math.floor((cycle * 16) / 60)}:{String((cycle * 16) % 60).padStart(2, "0")}
            </div>
            <div className="text-sm text-muted-foreground">Duration</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={toggleTimer}
            size="lg"
            className={`${isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white`}
          >
            {isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
            {isActive ? "Pause" : "Start"}
          </Button>

          <Button onClick={resetTimer} variant="outline" size="lg">
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>

          <Button onClick={() => setSoundEnabled(!soundEnabled)} variant="outline" size="lg">
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>Follow the circle and breathe with the rhythm</p>
          <p className="text-xs">4 seconds in → 4 seconds hold → 4 seconds out → 4 seconds hold</p>
        </div>
      </CardContent>
    </Card>
  )
}
