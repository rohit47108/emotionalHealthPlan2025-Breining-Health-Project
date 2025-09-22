"use client"

import { motion } from "framer-motion"
import { Heart, Apple, Moon, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageGallery } from "./image-gallery"
import { RoutineBuilder } from "./routine-builder"

interface HealthyLifestyleData {
  title: string
  subtitle: string
  content: string[]
  tips: {
    title: string
    items: string[]
  }
  images: Array<{
    src: string
    alt: string
    caption: string
  }>
  routineBuilder: {
    categories: string[]
    defaultRoutines: string[]
  }
}

interface HealthyLifestyleSectionProps {
  data: HealthyLifestyleData
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

export function HealthyLifestyleSection({ data }: HealthyLifestyleSectionProps) {
  return (
    <section id="lifestyle" className="py-20 bg-gradient-to-b from-muted/20 to-background">
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
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-600 dark:text-orange-400 text-sm font-medium">
              <Heart className="w-4 h-4" />
              <span>Lifestyle Wellness</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-balance">{data.title}</h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{data.subtitle}</p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Healthy Choices */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Apple className="w-5 h-5 text-orange-500" />
                    <span>Foundation of Healthy Living</span>
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
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground leading-relaxed">{point}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Healthy Living Tips */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    <span>{data.tips.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.tips.items.map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-lg border border-yellow-200/50 dark:border-yellow-800/50"
                      >
                        <p className="font-medium text-yellow-700 dark:text-yellow-300 leading-relaxed">{tip}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Wellness CTA */}
              <motion.div
                variants={itemVariants}
                className="p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white"
              >
                <div className="flex items-center space-x-4">
                  <Moon className="w-8 h-8" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">Build Healthy Habits</h3>
                    <p className="text-orange-100">Small daily changes lead to lasting wellness</p>
                  </div>
                  <Button variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                    Start Today
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Image Gallery */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Healthy Lifestyle Inspiration</h3>
                <ImageGallery images={data.images} />
              </div>
            </motion.div>
          </div>

          {/* Routine Builder */}
          <motion.div variants={itemVariants}>
            <RoutineBuilder
              categories={data.routineBuilder.categories}
              defaultRoutines={data.routineBuilder.defaultRoutines}
              storageKey="healthy-lifestyle-routine"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
