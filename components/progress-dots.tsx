"use client"

import { motion } from "framer-motion"

interface ProgressDotsProps {
  sections: Array<{ id: string; label: string }>
  activeSection: string
  className?: string
}

export function ProgressDots({ sections, activeSection, className = "" }: ProgressDotsProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block ${className}`}>
      <div className="flex flex-col space-y-3">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id
          const isPassed = sections.findIndex((s) => s.id === activeSection) > index

          return (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex items-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Dot */}
              <motion.div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-500 border-indigo-500 shadow-lg shadow-indigo-500/50"
                    : isPassed
                      ? "bg-indigo-300 border-indigo-300"
                      : "bg-transparent border-muted-foreground/50 hover:border-indigo-400"
                }`}
                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
              />

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute left-6 px-3 py-1 bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg"
              >
                {section.label}
              </motion.div>

              {/* Connection Line */}
              {index < sections.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 w-0.5 h-6 transform -translate-x-1/2 transition-colors duration-300 ${
                    isPassed ? "bg-indigo-300" : "bg-muted-foreground/20"
                  }`}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
