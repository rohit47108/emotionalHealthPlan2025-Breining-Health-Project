"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProgressDots } from "@/components/progress-dots"
import { PhysicalActivitiesSection } from "@/components/physical-activities-section"
import { MentalStrategiesSection } from "@/components/mental-strategies-section"
import { SocialSupportSection } from "@/components/social-support-section"
import { HealthyLifestyleSection } from "@/components/healthy-lifestyle-section"
import { SummarySection } from "@/components/summary-section"
import { QuickEditModal } from "@/components/quick-edit-modal"
import { RubricChecklist } from "@/components/rubric-checklist"
import healthPlanData from "@/content/health-plan.json"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(Math.min(progress, 100))

      // Determine active section
      const sections = ["hero", "physical", "mental", "social", "lifestyle", "summary"]
      const sectionElements = sections.map((id) => ({
        id,
        element: document.getElementById(id),
        offset: document.getElementById(id)?.offsetTop || 0,
      }))

      const currentSection = sectionElements
        .filter((section) => section.element)
        .find((section) => {
          const rect = section.element!.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative">
      <Navbar
        sections={healthPlanData.navigation.sections}
        activeSection={activeSection}
        scrollProgress={scrollProgress}
      />

      <ProgressDots sections={healthPlanData.navigation.sections} activeSection={activeSection} />

      <HeroSection data={healthPlanData.hero} />

      <PhysicalActivitiesSection data={healthPlanData.sections.physicalActivities} />

      <MentalStrategiesSection data={healthPlanData.sections.mentalStrategies} />

      <SocialSupportSection data={healthPlanData.sections.socialSupport} />

      <HealthyLifestyleSection data={healthPlanData.sections.healthyLifestyle} />

      <SummarySection data={healthPlanData.closing} />

      <QuickEditModal />

      <RubricChecklist />
    </main>
  )
}
