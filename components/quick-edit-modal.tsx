"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Settings, Code, Palette, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function QuickEditModal() {
  const [isOpen, setIsOpen] = useState(false)

  const editInstructions = {
    content: [
      {
        section: "Student Info",
        key: "studentName, date",
        description: "Update your name and presentation date in the hero section",
      },
      {
        section: "Colors & Theme",
        key: "theme.primary, theme.secondary",
        description: "Change the main colors and visual style of your site",
      },
      {
        section: "Hero Section",
        key: "hero.title, hero.subtitle, hero.bgImage",
        description: "Customize the main title, subtitle, and background image",
      },
      {
        section: "Section Content",
        key: "sections.*.content, sections.*.examples",
        description: "Edit the text content and examples for each health section",
      },
      {
        section: "Images",
        key: "sections.*.images[].src",
        description: "Replace image URLs with your own photos (use Unsplash or your images)",
      },
      {
        section: "Interactive Tools",
        key: "breathing.*, journalPrompts, habitTracker.activities",
        description: "Customize breathing timer settings, journal prompts, and activity lists",
      },
    ],
    styling: [
      {
        property: "Primary Color",
        location: "theme.primary",
        example: "#6366f1 (indigo), #8b5cf6 (purple), #06b6d4 (cyan)",
      },
      {
        property: "Background Images",
        location: "hero.bgImage, sections.*.images",
        example: "Use Unsplash URLs or upload your own images",
      },
      {
        property: "Glass Effect",
        location: "theme.glass",
        example: "true/false to enable/disable glassmorphism effects",
      },
    ],
    features: [
      {
        feature: "Breathing Timer",
        settings: "breathing.inhale, hold1, exhale, hold2",
        description: "Adjust timing for box breathing exercise (default: 4-4-4-4 seconds)",
      },
      {
        feature: "Journal Prompts",
        settings: "journalPrompts[]",
        description: "Add or modify reflection questions for the journaling tool",
      },
      {
        feature: "Habit Tracking",
        settings: "habitTracker.activities[]",
        description: "Customize the list of activities to track weekly",
      },
      {
        feature: "Connection Planner",
        settings: "connectionPlanner.defaultContacts, reminderOptions",
        description: "Set default contacts and reminder frequency options",
      },
    ],
  }

  return (
    <>
      {/* Floating Edit Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="rounded-full w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Settings className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Quick Edit Guide</span>
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content" className="flex items-center space-x-2">
                  <Type className="w-4 h-4" />
                  <span>Content</span>
                </TabsTrigger>
                <TabsTrigger value="styling" className="flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span>Styling</span>
                </TabsTrigger>
                <TabsTrigger value="features" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Features</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div className="text-sm text-muted-foreground mb-4">
                  Edit these keys in <code className="bg-muted px-2 py-1 rounded">content/health-plan.json</code> to
                  customize your content:
                </div>
                {editInstructions.content.map((item, index) => (
                  <Card key={index} className="glass">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{item.section}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded block">{item.key}</code>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="styling" className="space-y-4">
                <div className="text-sm text-muted-foreground mb-4">
                  Customize the visual appearance of your health plan:
                </div>
                {editInstructions.styling.map((item, index) => (
                  <Card key={index} className="glass">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center space-x-2">
                        <Palette className="w-4 h-4" />
                        <span>{item.property}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded block">{item.location}</code>
                      <p className="text-sm text-muted-foreground">{item.example}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <div className="text-sm text-muted-foreground mb-4">Configure interactive features and tools:</div>
                {editInstructions.features.map((item, index) => (
                  <Card key={index} className="glass">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>{item.feature}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded block">{item.settings}</code>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Pro Tips:</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• All changes are made in the JSON file - no coding required!</li>
                <li>• Use Unsplash.com for high-quality free images</li>
                <li>• Keep image URLs under 2000 characters for best performance</li>
                <li>• Test your changes by refreshing the page</li>
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </>
  )
}
