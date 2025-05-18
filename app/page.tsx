"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download, RefreshCw, ImageIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import html2canvas from "html2canvas"

export default function PreetyPost() {
  const [username, setUsername] = useState("")
  const [handle, setHandle] = useState("")
  const [content, setContent] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [gradient, setGradient] = useState("bg-gradient-to-br from-pink-400 to-purple-600")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const gradients = [
    "bg-gradient-to-br from-pink-400 to-purple-600",
    "bg-gradient-to-r from-cyan-400 to-blue-500",
    "bg-gradient-to-br from-green-300 to-teal-500",
    "bg-gradient-to-r from-amber-300 to-orange-500",
    "bg-gradient-to-br from-fuchsia-500 to-purple-600",
    "bg-gradient-to-r from-rose-400 to-red-500",
    "bg-gradient-to-br from-sky-400 to-indigo-500",
    "bg-gradient-to-r from-violet-400 to-purple-500",
    "bg-gradient-to-br from-yellow-200 to-yellow-500",
    "bg-gradient-to-r from-emerald-400 to-cyan-500",
    "bg-gradient-to-r from-gray-900 to-black",
    "bg-gradient-to-br from-white to-gray-200",
    "bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900",
    "bg-gradient-to-br from-emerald-500 to-blue-500",
    "bg-gradient-to-r from-rose-500 via-red-400 to-orange-500",
  ]

  const generateRandomGradient = () => {
    const randomIndex = Math.floor(Math.random() * gradients.length)
    setGradient(gradients[randomIndex])
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const downloadCard = async () => {
    if (!content.trim() || !username.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter a username and post content",
        variant: "destructive",
      })
      return
    }

    const cardElement = document.getElementById("post-card")
    if (!cardElement) return

    try {
      const canvas = await html2canvas(cardElement, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: null,
      })
      const image = canvas.toDataURL("image/png", 1.0) // Use maximum quality
      const link = document.createElement("a")
      link.href = image
      link.download = "preety-post.png"
      link.click()

      toast({
        title: "Success!",
        description: "Your high-quality Preety Post has been downloaded",
      })
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error generating your image",
        variant: "destructive",
      })
    }
  }

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Preety Post</h1>
          <p className="text-muted-foreground">Create beautiful X post cards with your content</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Display Name
              </label>
              <Input
                id="username"
                placeholder="John Doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="handle" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="handle"
                placeholder="johndoe"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Post Content
            </label>
            <Textarea
              id="content"
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Profile Picture</label>
            <div className="flex items-center space-x-4">
              <Button onClick={triggerFileInput} variant="outline" type="button">
                <ImageIcon className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              {profileImage && (
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback>{getInitials(username)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <Button onClick={generateRandomGradient} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              New Background
            </Button>
            <Button onClick={downloadCard} disabled={!content.trim() || !username.trim()}>
              <Download className="mr-2 h-4 w-4" />
              Download Card
            </Button>
          </div>

          <div className="flex justify-center pt-4">
            <Card id="post-card" className={cn("w-full max-w-md overflow-hidden", gradient)}>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      {profileImage ? (
                        <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
                      ) : (
                        <AvatarFallback className="bg-gray-200 text-gray-700">
                          {username ? getInitials(username) : "?"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className="font-bold text-white">{username || "Display Name"}</div>
                      <div className="text-sm text-white/80">@{handle || "username"}</div>
                    </div>
                  </div>
                  <X className="h-5 w-5 text-white" />
                </div>

                <div className="text-white text-lg">{content || "Your post content will appear here..."}</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
