import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Inter, Outfit } from "next/font/google"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Emotional Health Plan - A Better You",
  description:
    "Develop your emotional health with physical activities, mental strategies, social support, and healthy lifestyle choices.",
  generator: "v0.app",
  keywords: ["emotional health", "wellness", "mental health", "self-care", "student health"],
  authors: [{ name: "Health Plan Creator" }],
  openGraph: {
    title: "Emotional Health Plan - A Better You",
    description: "Interactive guide to developing emotional wellness through proven strategies.",
    type: "website",
    images: ["/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`font-sans antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
