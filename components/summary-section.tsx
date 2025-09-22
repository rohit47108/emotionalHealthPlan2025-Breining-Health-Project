"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, CheckCircle, Star, Award, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SummaryData {
  reminder: string
  cta: string
  attribution: string
}

interface SummarySectionProps {
  data: SummaryData
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

export function SummarySection({ data }: SummarySectionProps) {
  const [stats, setStats] = useState({
    physicalActivities: 0,
    mentalStrategies: 0,
    socialConnections: 0,
    lifestyleRoutines: 0,
    journalEntries: 0,
    breathingSessions: 0,
  })

  useEffect(() => {
    // Gather stats from localStorage
    const physicalHabits = JSON.parse(localStorage.getItem("physical-activities") || "[]")
    const mentalJournal = JSON.parse(localStorage.getItem("mental-strategies-journal") || "[]")
    const socialConnections = JSON.parse(localStorage.getItem("social-connections") || "[]")
    const lifestyleRoutines = JSON.parse(localStorage.getItem("healthy-lifestyle-routine") || "[]")

    const physicalProgress =
      physicalHabits.length > 0
        ? Math.round((physicalHabits.flat().filter(Boolean).length / physicalHabits.flat().length) * 100)
        : 0

    const lifestyleProgress =
      lifestyleRoutines.length > 0
        ? Math.round((lifestyleRoutines.filter((r: any) => r.completed).length / lifestyleRoutines.length) * 100)
        : 0

    setStats({
      physicalActivities: physicalProgress,
      mentalStrategies: mentalJournal.length,
      socialConnections: socialConnections.length,
      lifestyleRoutines: lifestyleProgress,
      journalEntries: mentalJournal.length,
      breathingSessions: Number.parseInt(localStorage.getItem("breathing-sessions") || "0"),
    })
  }, [])

  const exportHealthPlan = () => {
    const physicalHabits = JSON.parse(localStorage.getItem("physical-activities") || "{}")
    const mentalJournal = JSON.parse(localStorage.getItem("mental-strategies-journal") || "[]")
    const socialConnections = JSON.parse(localStorage.getItem("social-connections") || "[]")
    const lifestyleRoutines = JSON.parse(localStorage.getItem("healthy-lifestyle-routine") || "[]")

    const exportData = `
EMOTIONAL HEALTH PLAN SUMMARY
Generated on: ${new Date().toLocaleDateString()}

=== PHYSICAL ACTIVITIES ===
Weekly Progress: ${stats.physicalActivities}%
Activities Tracked: ${Object.keys(physicalHabits).length}

=== MENTAL STRATEGIES ===
Journal Entries: ${stats.journalEntries}
Breathing Sessions: ${stats.breathingSessions}

Recent Journal Entries:
${mentalJournal
  .slice(0, 3)
  .map((entry: any) => `- ${entry.date}: ${entry.content.substring(0, 100)}...`)
  .join("\n")}

=== SOCIAL SUPPORT ===
Connections: ${stats.socialConnections}
${socialConnections.map((contact: any) => `- ${contact.name} (${contact.relationship})`).join("\n")}

=== HEALTHY LIFESTYLE ===
Daily Routine Progress: ${stats.lifestyleRoutines}%
Active Routines: ${lifestyleRoutines.length}

=== REMINDER ===
${data.reminder}

---
Keep up the great work on your emotional health journey!
    `.trim()

    const blob = new Blob([exportData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `emotional-health-plan-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const overallProgress = Math.round(
    (stats.physicalActivities +
      (stats.journalEntries > 0 ? 100 : 0) +
      (stats.socialConnections > 0 ? 100 : 0) +
      stats.lifestyleRoutines) /
      4,
  )

  return (
    <section id="summary" className="py-20 bg-gradient-to-b from-background to-muted/20">
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
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              <Award className="w-4 h-4" />
              <span>Your Journey Summary</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-balance">
              Celebrating Your Progress
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Review your emotional health journey and continue building on your achievements
            </p>
          </motion.div>

          {/* Progress Overview */}
          <motion.div variants={itemVariants}>
            <Card className="glass">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-indigo-500" />
                  <span>Overall Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{overallProgress}%</div>
                  <p className="text-muted-foreground">Complete</p>
                </div>

                <Progress value={overallProgress} className="h-3" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-emerald-600">{stats.physicalActivities}%</div>
                    <div className="text-sm text-muted-foreground">Physical Activities</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-purple-600">{stats.journalEntries}</div>
                    <div className="text-sm text-muted-foreground">Journal Entries</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-rose-600">{stats.socialConnections}</div>
                    <div className="text-sm text-muted-foreground">Connections</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-orange-600">{stats.lifestyleRoutines}%</div>
                    <div className="text-sm text-muted-foreground">Daily Routines</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievement Badges */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Wellness Explorer",
                description: "Started your emotional health journey",
                icon: Star,
                earned: true,
                color: "text-yellow-500",
              },
              {
                title: "Mindful Practitioner",
                description: "Completed breathing exercises",
                icon: CheckCircle,
                earned: stats.breathingSessions > 0,
                color: "text-green-500",
              },
              {
                title: "Social Connector",
                description: "Built your support network",
                icon: Award,
                earned: stats.socialConnections > 0,
                color: "text-blue-500",
              },
            ].map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`glass ${badge.earned ? "border-green-200 dark:border-green-800" : "opacity-50"}`}>
                  <CardContent className="p-6 text-center space-y-4">
                    <badge.icon className={`w-12 h-12 mx-auto ${badge.color}`} />
                    <div>
                      <h3 className="font-semibold text-lg">{badge.title}</h3>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                    </div>
                    {badge.earned && (
                      <div className="inline-flex items-center space-x-1 text-green-600 dark:text-green-400 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>Earned</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Reminder Message */}
          <motion.div variants={itemVariants}>
            <Card className="glass border-indigo-200 dark:border-indigo-800">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="w-8 h-8 text-white" />
                </div>

                <blockquote className="text-lg font-medium text-foreground italic leading-relaxed">
                  "{data.reminder}"
                </blockquote>

                <Button
                  onClick={exportHealthPlan}
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {data.cta}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center text-sm text-muted-foreground">
            <p>{data.attribution}</p>
            <p className="mt-2">Built with care for your emotional wellness journey</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
