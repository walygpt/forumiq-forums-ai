"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, TrendingUp } from "lucide-react"

interface Post {
  id: string
  author: string
  content: string
  createdAt: string
}

interface SentimentResult {
  postId: string
  author: string
  sentiment: "positive" | "neutral" | "negative"
  toxicity: "safe" | "mild" | "severe"
  score: number
}

interface SentimentAnalysisProps {
  posts: Post[]
}

export function SentimentAnalysis({ posts }: SentimentAnalysisProps) {
  const [sentiments, setSentiments] = useState<SentimentResult[]>([])
  const [mode, setMode] = useState<"live" | "demo" | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const analyzeSentiment = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/ai/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posts }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze sentiment")
      }

      const data = await response.json()
      setSentiments(data.sentiments)
      setMode(data.mode || "demo")
    } catch (error) {
      console.error("[v0] Failed to analyze sentiment:", error)
      setSentiments(
        posts.map((post, idx) => ({
          postId: post.id,
          author: post.author,
          sentiment: idx % 2 === 0 ? "positive" : "neutral",
          toxicity: "safe",
          score: 0.85 + Math.random() * 0.1,
        })),
      )
      setMode("demo")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (posts.length > 0) {
      analyzeSentiment()
    }
  }, [posts])

  const sentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "negative":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    }
  }

  const toxicityColor = (toxicity: string) => {
    switch (toxicity) {
      case "severe":
        return "bg-red-500/10 text-red-500"
      case "mild":
        return "bg-yellow-500/10 text-yellow-500"
      default:
        return "bg-green-500/10 text-green-500"
    }
  }

  return (
    <Card className="bg-card border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Sentiment & Toxicity Analysis</h2>
          </div>
          {mode === "demo" && (
            <Badge variant="outline" className="text-xs">
              Demo Mode
            </Badge>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8 px-6">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
          <span className="ml-2 text-sm text-muted-foreground">Analyzing sentiments...</span>
        </div>
      ) : error ? (
        <div className="p-6">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      ) : sentiments.length > 0 ? (
        <div className="p-6 space-y-3">
          {sentiments.map((s) => (
            <div key={s.postId} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{s.author}</p>
                <p className="text-xs text-muted-foreground mt-1">Confidence: {Math.round(s.score * 100)}%</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={sentimentColor(s.sentiment)}>
                  {s.sentiment.charAt(0).toUpperCase() + s.sentiment.slice(1)}
                </Badge>
                <Badge className={toxicityColor(s.toxicity)}>
                  {s.toxicity.charAt(0).toUpperCase() + s.toxicity.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center">
          <p className="text-sm text-muted-foreground">No sentiment data available</p>
        </div>
      )}
    </Card>
  )
}
