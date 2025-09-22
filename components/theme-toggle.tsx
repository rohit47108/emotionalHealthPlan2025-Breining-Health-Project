"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme") as "light" | "dark" | "system" | null
    if (stored) {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    localStorage.setItem("theme", theme)
  }, [theme, mounted])

  if (!mounted) {
    return <Button variant="ghost" size="sm" className="w-9 h-9 p-0" />
  }

  const toggleTheme = () => {
    setTheme((current) => {
      if (current === "light") return "dark"
      if (current === "dark") return "system"
      return "light"
    })
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-9 h-9 p-0">
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
