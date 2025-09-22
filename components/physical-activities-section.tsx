"use client"

import { motion } from "framer-motion"
import { Activity, Target, Users, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageGallery } from "./image-gallery"
import { HabitTracker } from "./habit-tracker"

interface PhysicalActivitiesData {
  title: string
  subtitle: string
  content: string[]
  examples: {
    title: string
    items: string[]
  }
  images: Array<{
    src: string
    alt: string
    caption: string
  }>
  habitTracker: {
    activities: string[]
  }
}

interface PhysicalActivitiesSectionProps {
  data: PhysicalActivitiesData
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export function PhysicalActivitiesSection({ data }: PhysicalActivitiesSectionProps) {
  return (
    <section id="physical" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              <Activity className="w-4 h-4" />
              <span>Physical Wellness</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-balance">{data.title}</h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{data.subtitle}</p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Importance Points */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-indigo-500" />
                    <span>Why Physical Activity Matters</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.content.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground leading-relaxed">{point}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Examples */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-emerald-500" />
                    <span>{data.examples.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {data.examples.items.map((example, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50"
                      >
                        <p className="font-medium text-emerald-700 dark:text-emerald-300">{example}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Start CTA */}
              <motion.div
                variants={itemVariants}
                className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white"
              >
                <div className="flex items-center space-x-4">
                  <Clock className="w-8 h-8" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">Start Your 30-Minute Plan</h3>
                    <p className="text-indigo-100">Begin with just 30 minutes of activity today</p>
                  </div>
                  <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-indigo-50">
                    Get Started
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Image Gallery */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Activity Inspiration</h3>
                <ImageGallery images={data.images} />
              </div>
            </motion.div>
          </div>

          {/* Habit Tracker */}
          <motion.div variants={itemVariants}>
            <HabitTracker
              activities={data.habitTracker.activities}
              title="Weekly Physical Activity Tracker"
              storageKey="physical-activities"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
