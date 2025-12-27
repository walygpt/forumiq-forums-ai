"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles } from "lucide-react"

interface Post {
  id: string
  author: string
  content: string
  createdAt: string
}

interface AIThreadSummaryProps {
  threadId: string
  posts: Post[]
}

export function AIThreadSummary({ threadId, posts }: AIThreadSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null)
  const [mode, setMode] = useState<"live" | "demo" | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateSummary = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId, posts }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate summary")
      }

      const data = await response.json()
      setSummary(data.summary)
      setMode(data.mode || "demo")
    } catch (error) {
      console.error("Failed to generate summary:", error)
      setError("Failed to generate summary. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generateSummary()
  }, [threadId])

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">AI Thread Summary</h2>
          </div>
          {mode === "demo" && (
            <Badge variant="outline" className="text-xs">
              Demo Mode
            </Badge>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
            <span className="ml-2 text-sm text-muted-foreground">Analyzing thread...</span>
          </div>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : summary ? (
          <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{summary}</div>
        ) : (
          <p className="text-sm text-muted-foreground">No summary available</p>
        )}
      </div>
    </Card>
  )
}
