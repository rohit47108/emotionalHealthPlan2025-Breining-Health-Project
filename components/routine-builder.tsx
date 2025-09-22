"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Check, X, Clock, Moon, Utensils, Smartphone, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RoutineItem {
  id: string
  text: string
  category: string
  completed: boolean
  time?: string
}

interface RoutineBuilderProps {
  categories: string[]
  defaultRoutines: string[]
  storageKey?: string
}

const categoryIcons = {
  "Meal Planning": Utensils,
  "Sleep Routine": Moon,
  "Hobby Time": Heart,
  "Screen Time Limits": Smartphone,
  "Self-Care": Heart,
}

export function RoutineBuilder({ categories, defaultRoutines, storageKey = "daily-routine" }: RoutineBuilderProps) {
  const [routines, setRoutines] = useState<RoutineItem[]>([])
  const [newRoutine, setNewRoutine] = useState({ text: "", category: categories[0], time: "" })
  const [isAdding, setIsAdding] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      try {
        setRoutines(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse stored routines:", e)
      }
    } else {
      // Initialize with default routines
      const initialRoutines: RoutineItem[] = defaultRoutines.map((routine, index) => ({
        id: `default-${index}`,
        text: routine,
        category: categories[index % categories.length],
        completed: false,
      }))
      setRoutines(initialRoutines)
    }
  }, [categories, defaultRoutines, storageKey])

  useEffect(() => {
    if (mounted && routines.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(routines))
    }
  }, [routines, storageKey, mounted])

  const addRoutine = () => {
    if (!newRoutine.text.trim()) return

    const routine: RoutineItem = {
      id: Date.now().toString(),
      text: newRoutine.text.trim(),
      category: newRoutine.category,
      completed: false,
      time: newRoutine.time || undefined,
    }

    setRoutines((prev) => [...prev, routine])
    setNewRoutine({ text: "", category: categories[0], time: "" })
    setIsAdding(false)
  }

  const toggleRoutine = (id: string) => {
    setRoutines((prev) =>
      prev.map((routine) => (routine.id === id ? { ...routine, completed: !routine.completed } : routine)),
    )
  }

  const deleteRoutine = (id: string) => {
    setRoutines((prev) => prev.filter((routine) => routine.id !== id))
  }

  const resetDay = () => {
    setRoutines((prev) => prev.map((routine) => ({ ...routine, completed: false })))
  }

  const getCompletionRate = () => {
    if (routines.length === 0) return 0
    return Math.round((routines.filter((r) => r.completed).length / routines.length) * 100)
  }

  const groupedRoutines = categories.reduce(
    (acc, category) => {
      acc[category] = routines.filter((routine) => routine.category === category)
      return acc
    },
    {} as Record<string, RoutineItem[]>,
  )

  if (!mounted) {
    return <div className="animate-pulse bg-muted rounded-xl h-96" />
  }

  return (
    <Card className="glass">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <span>Daily Routine Builder</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">{getCompletionRate()}% complete</div>
          <Button variant="outline" size="sm" onClick={resetDay}>
            Reset Day
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Today's Progress</span>
            <span>
              {routines.filter((r) => r.completed).length}/{routines.length} completed
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getCompletionRate()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Routine Categories */}
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryRoutines = groupedRoutines[category] || []
            const Icon = categoryIcons[category as keyof typeof categoryIcons] || Clock

            return (
              <div key={category} className="space-y-3">
                <h4 className="flex items-center space-x-2 font-medium text-foreground">
                  <Icon className="w-4 h-4" />
                  <span>{category}</span>
                  <span className="text-xs text-muted-foreground">
                    ({categoryRoutines.filter((r) => r.completed).length}/{categoryRoutines.length})
                  </span>
                </h4>

                <div className="space-y-2">
                  {categoryRoutines.map((routine, index) => (
                    <motion.div
                      key={routine.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                        routine.completed
                          ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
                          : "bg-muted/50 border-border/50 hover:bg-muted"
                      }`}
                    >
                      <button
                        onClick={() => toggleRoutine(routine.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          routine.completed
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-muted-foreground/50 hover:border-green-400"
                        }`}
                      >
                        {routine.completed && <Check className="w-3 h-3" />}
                      </button>

                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            routine.completed ? "line-through text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {routine.text}
                        </p>
                        {routine.time && <p className="text-xs text-muted-foreground">{routine.time}</p>}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteRoutine(routine.id)}
                        className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}

                  {categoryRoutines.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">No routines in this category yet</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Add New Routine */}
        {isAdding ? (
          <div className="p-4 bg-muted/50 rounded-lg border border-border/50 space-y-3">
            <Input
              placeholder="Enter routine item..."
              value={newRoutine.text}
              onChange={(e) => setNewRoutine((prev) => ({ ...prev, text: e.target.value }))}
              onKeyPress={(e) => e.key === "Enter" && addRoutine()}
            />
            <div className="flex space-x-2">
              <Select
                value={newRoutine.category}
                onValueChange={(value) => setNewRoutine((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Time (optional)"
                value={newRoutine.time}
                onChange={(e) => setNewRoutine((prev) => ({ ...prev, time: e.target.value }))}
                className="w-32"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={addRoutine}>
                Add Routine
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setIsAdding(true)} className="w-full border-dashed">
            <Plus className="w-4 h-4 mr-2" />
            Add New Routine
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
