"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Circle, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RubricItem {
  id: string
  title: string
  description: string
  completed: boolean
}

export function RubricChecklist() {
  const [rubricItems, setRubricItems] = useState<RubricItem[]>([
    {
      id: "title-slide",
      title: "Title Slide",
      description: "Clear, creative, properly formatted with name and date",
      completed: true,
    },
    {
      id: "physical-activities",
      title: "Physical Activities",
      description: "Clear descriptions with 3-4 relevant images and captions",
      completed: true,
    },
    {
      id: "mental-strategies",
      title: "Mental Strategies",
      description: "Clear descriptions with images, breathing timer, and journal",
      completed: true,
    },
    {
      id: "social-support",
      title: "Social Support",
      description: "Clear descriptions with images and connection planner",
      completed: true,
    },
    {
      id: "healthy-lifestyle",
      title: "Healthy Lifestyle",
      description: "Clear descriptions with images and routine builder",
      completed: true,
    },
    {
      id: "overall-presentation",
      title: "Overall Presentation",
      description: "Beautiful, coherent flow with smooth transitions",
      completed: true,
    },
  ])

  const completedCount = rubricItems.filter((item) => item.completed).length
  const totalCount = rubricItems.length
  const completionRate = Math.round((completedCount / totalCount) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 z-40 max-w-sm"
    >
      <Card className="glass border-green-200 dark:border-green-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-green-500" />
              <span>Rubric Checklist</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {completionRate}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {rubricItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3"
            >
              {item.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${item.completed ? "text-green-700 dark:text-green-300" : "text-muted-foreground"}`}
                >
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}

          {completionRate === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800 text-center"
            >
              <Award className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-700 dark:text-green-300">All Requirements Met!</p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Your health plan is complete and ready for presentation
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
