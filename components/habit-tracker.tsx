"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HabitTrackerProps {
  activities: string[]
  title?: string
  storageKey?: string
}

interface HabitData {
  [activity: string]: boolean[]
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function HabitTracker({
  activities,
  title = "Weekly Activity Tracker",
  storageKey = "physical-habits",
}: HabitTrackerProps) {
  const [habits, setHabits] = useState<HabitData>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      try {
        setHabits(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse stored habits:", e)
      }
    } else {
      // Initialize with empty habits
      const initialHabits: HabitData = {}
      activities.forEach((activity) => {
        initialHabits[activity] = new Array(7).fill(false)
      })
      setHabits(initialHabits)
    }
  }, [activities, storageKey])

  useEffect(() => {
    if (mounted && Object.keys(habits).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(habits))
    }
  }, [habits, storageKey, mounted])

  const toggleHabit = (activity: string, dayIndex: number) => {
    setHabits((prev) => ({
      ...prev,
      [activity]:
        prev[activity]?.map((completed, index) => (index === dayIndex ? !completed : completed)) ||
        new Array(7).fill(false).map((_, index) => index === dayIndex),
    }))
  }

  const resetWeek = () => {
    const resetHabits: HabitData = {}
    activities.forEach((activity) => {
      resetHabits[activity] = new Array(7).fill(false)
    })
    setHabits(resetHabits)
  }

  const getCompletionRate = () => {
    const total = activities.length * 7
    const completed = Object.values(habits).flat().filter(Boolean).length
    return Math.round((completed / total) * 100)
  }

  if (!mounted) {
    return <div className="animate-pulse bg-muted rounded-xl h-64" />
  }

  return (
    <Card className="glass">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">{getCompletionRate()}% complete</div>
          <Button variant="ghost" size="sm" onClick={resetWeek} className="text-muted-foreground hover:text-foreground">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Days header */}
          <div className="grid grid-cols-8 gap-2 text-sm font-medium text-muted-foreground">
            <div></div>
            {DAYS.map((day) => (
              <div key={day} className="text-center">
                {day}
              </div>
            ))}
          </div>

          {/* Activities */}
          {activities.map((activity, activityIndex) => (
            <motion.div
              key={activity}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: activityIndex * 0.1 }}
              className="grid grid-cols-8 gap-2 items-center"
            >
              <div className="text-sm font-medium text-right pr-2 truncate">{activity}</div>
              {DAYS.map((_, dayIndex) => {
                const isCompleted = habits[activity]?.[dayIndex] || false
                return (
                  <motion.button
                    key={dayIndex}
                    onClick={() => toggleHabit(activity, dayIndex)}
                    className={`aspect-square rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-muted-foreground/30 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-950"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isCompleted && <Check className="w-3 h-3" />}
                  </motion.button>
                )
              })}
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Weekly Progress</span>
            <span>{getCompletionRate()}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getCompletionRate()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
