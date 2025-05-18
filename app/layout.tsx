import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

// Use Inter with specific weights to better match Twitter's Chirp font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata = {
  title: "Preety Post - Create Beautiful X Post Cards",
  description: "Generate high-quality X post cards with your profile picture, username, and content",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
