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
      
    </motion.div>
  )
}
