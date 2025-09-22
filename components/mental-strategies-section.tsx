"use client"

import { motion } from "framer-motion"
import { Brain, Lightbulb, Heart, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageGallery } from "./image-gallery"
import { BreathingTimer } from "./breathing-timer"
import { Journal } from "./journal"

interface MentalStrategiesData {
  title: string
  subtitle: string
  content: string[]
  techniques: {
    title: string
    items: string[]
  }
  breathing: {
    inhale: number
    hold1: number
    exhale: number
    hold2: number
    instructions: string
  }
  journalPrompts: string[]
  images: Array<{
    src: string
    alt: string
    caption: string
  }>
}

interface MentalStrategiesSectionProps {
  data: MentalStrategiesData
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

export function MentalStrategiesSection({ data }: MentalStrategiesSectionProps) {
  return (
    <section id="mental" className="py-20 bg-gradient-to-b from-muted/20 to-background">
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
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium">
              <Brain className="w-4 h-4" />
              <span>Mental Wellness</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-balance">{data.title}</h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{data.subtitle}</p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Main Strategies */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-purple-500" />
                    <span>Core Mental Strategies</span>
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
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground leading-relaxed">{point}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Techniques */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <span>{data.techniques.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.techniques.items.map((technique, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200/50 dark:border-amber-800/50"
                      >
                        <p className="font-medium text-amber-700 dark:text-amber-300 leading-relaxed">{technique}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Mindfulness CTA */}
              <motion.div
                variants={itemVariants}
                className="p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
              >
                <div className="flex items-center space-x-4">
                  <Heart className="w-8 h-8" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">Practice Mindfulness Daily</h3>
                    <p className="text-purple-100">Start with just 5 minutes of mindful breathing</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Image Gallery */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Mental Wellness Inspiration</h3>
                <ImageGallery images={data.images} />
              </div>
            </motion.div>
          </div>

          {/* Interactive Tools */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Breathing Timer */}
            <motion.div variants={itemVariants}>
              <BreathingTimer
                inhale={data.breathing.inhale}
                hold1={data.breathing.hold1}
                exhale={data.breathing.exhale}
                hold2={data.breathing.hold2}
                instructions={data.breathing.instructions}
              />
            </motion.div>

            {/* Journal */}
            <motion.div variants={itemVariants}>
              <Journal prompts={data.journalPrompts} storageKey="mental-strategies-journal" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
