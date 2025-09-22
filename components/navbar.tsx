"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Activity, Brain, Users, Heart, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

interface NavItem {
  id: string
  label: string
  icon: string
}

interface NavbarProps {
  sections: NavItem[]
  activeSection: string
  scrollProgress: number
}

const iconMap = {
  home: Home,
  activity: Activity,
  brain: Brain,
  users: Users,
  heart: Heart,
  "check-circle": CheckCircle,
}

export function Navbar({ sections, activeSection, scrollProgress }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-strong" : "bg-transparent"
        }`}
      >
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
          <motion.div
            className="h-full bg-white/80"
            style={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Health Plan
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {sections.map((section) => {
                const Icon = iconMap[section.icon as keyof typeof iconMap] || Home
                const isActive = activeSection === section.id

                return (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      isActive ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg -z-10"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />

              {/* Mobile menu button */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden glass-strong border-t border-border/50"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                {sections.map((section) => {
                  const Icon = iconMap[section.icon as keyof typeof iconMap] || Home
                  const isActive = activeSection === section.id

                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        isActive
                          ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                          : "hover:bg-muted"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
