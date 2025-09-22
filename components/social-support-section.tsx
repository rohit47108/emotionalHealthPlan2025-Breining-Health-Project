"use client"

import { motion } from "framer-motion"
import { Users, Heart, HandHeart, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageGallery } from "./image-gallery"
import { ConnectionPlanner } from "./connection-planner"

interface SocialSupportData {
  title: string
  subtitle: string
  content: string[]
  ways: {
    title: string
    items: string[]
  }
  images: Array<{
    src: string
    alt: string
    caption: string
  }>
  connectionPlanner: {
    defaultContacts: string[]
    reminderOptions: string[]
  }
}

interface SocialSupportSectionProps {
  data: SocialSupportData
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

export function SocialSupportSection({ data }: SocialSupportSectionProps) {
  return (
    <section id="social" className="py-20 bg-gradient-to-b from-background to-muted/20">
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
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              <Users className="w-4 h-4" />
              <span>Social Wellness</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-balance">{data.title}</h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{data.subtitle}</p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Role of Social Support */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-emerald-500" />
                    <span>Why Social Support Matters</span>
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
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground leading-relaxed">{point}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Ways to Build Support */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HandHeart className="w-5 h-5 text-rose-500" />
                    <span>{data.ways.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.ways.items.map((way, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg border border-rose-200/50 dark:border-rose-800/50"
                      >
                        <p className="font-medium text-rose-700 dark:text-rose-300 leading-relaxed">{way}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community CTA */}
              <motion.div
                variants={itemVariants}
                className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white"
              >
                <div className="flex items-center space-x-4">
                  <MessageSquare className="w-8 h-8" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">Find Your Community</h3>
                    <p className="text-emerald-100">Connect with others who share your interests and values</p>
                  </div>
                  <Button variant="secondary" className="bg-white text-emerald-600 hover:bg-emerald-50">
                    Explore Groups
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Image Gallery */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Social Connection Inspiration</h3>
                <ImageGallery images={data.images} />
              </div>
            </motion.div>
          </div>

          {/* Connection Planner */}
          <motion.div variants={itemVariants}>
            <ConnectionPlanner
              defaultContacts={data.connectionPlanner.defaultContacts}
              reminderOptions={data.connectionPlanner.reminderOptions}
              storageKey="social-connections"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
