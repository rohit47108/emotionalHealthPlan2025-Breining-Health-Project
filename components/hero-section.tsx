"use client"

import { motion } from "framer-motion"
import { ChevronDown, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HeroData {
  title: string
  subtitle: string
  metaLine: string
  bgImage: string
  alt: string
}

interface HeroSectionProps {
  data: HeroData
}

export function HeroSection({ data }: HeroSectionProps) {
  const scrollToNext = () => {
    const nextSection = document.getElementById("physical")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image src={data.bgImage || "/placeholder.svg"} alt={data.alt} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20" />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Meta Line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-lg font-medium tracking-wide"
          >
            {data.metaLine}
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight text-balance"
          >
            {data.title.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl sm:text-2xl text-white/90 font-medium max-w-3xl mx-auto text-pretty"
          >
            {data.subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="pt-8"
          >
            <Button
              onClick={scrollToNext}
              size="lg"
              className="glass-strong text-white border-white/20 hover:bg-white/10 group px-8 py-4 text-lg font-medium"
            >
              <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              Start Your Journey
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={scrollToNext}
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <span className="text-sm font-medium mb-2 group-hover:text-white">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  )
}
