"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Download, Trash2, BookOpen, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface JournalProps {
  prompts: string[]
  storageKey?: string
}

interface JournalEntry {
  id: string
  prompt: string
  content: string
  date: string
  timestamp: number
}

export function Journal({ prompts, storageKey = "mental-journal" }: JournalProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0])
  const [currentContent, setCurrentContent] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      try {
        setEntries(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse stored journal entries:", e)
      }
    }
  }, [storageKey])

  useEffect(() => {
    if (mounted && entries.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(entries))
    }
  }, [entries, storageKey, mounted])

  const saveEntry = () => {
    if (!currentContent.trim()) return

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      prompt: currentPrompt,
      content: currentContent.trim(),
      date: new Date().toLocaleDateString(),
      timestamp: Date.now(),
    }

    setEntries((prev) => [newEntry, ...prev])
    setCurrentContent("")
  }

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  const exportEntries = () => {
    const exportData = entries
      .map((entry) => `Date: ${entry.date}\nPrompt: ${entry.prompt}\n\n${entry.content}\n\n---\n\n`)
      .join("")

    const blob = new Blob([exportData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `journal-entries-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!mounted) {
    return <div className="animate-pulse bg-muted rounded-xl h-96" />
  }

  return (
    <div className="space-y-6">
      {/* Writing Area */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span>Reflection Journal</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Prompt Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Choose a prompt to reflect on:</label>
            <Select value={currentPrompt} onValueChange={setCurrentPrompt}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {prompts.map((prompt, index) => (
                  <SelectItem key={index} value={prompt}>
                    {prompt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Writing Area */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Your thoughts:</label>
            <Textarea
              value={currentContent}
              onChange={(e) => setCurrentContent(e.target.value)}
              placeholder="Take a moment to reflect and write your thoughts..."
              className="min-h-32 resize-none"
              maxLength={1000}
            />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{currentContent.length}/1000 characters</span>
              <Button onClick={saveEntry} disabled={!currentContent.trim()} size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Entry
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journal Entries */}
      {entries.length > 0 && (
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              <span>Your Journal Entries ({entries.length})</span>
            </CardTitle>
            <Button onClick={exportEntries} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-muted/50 rounded-lg border border-border/50 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400">{entry.prompt}</p>
                      <p className="text-xs text-muted-foreground">{entry.date}</p>
                    </div>
                    <Button
                      onClick={() => deleteEntry(entry.id)}
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed">{entry.content}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
