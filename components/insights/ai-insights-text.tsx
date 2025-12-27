"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Loader2, Lightbulb } from "lucide-react"

export function AIInsightsText() {
  const [insights, setInsights] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock AI insights - in production, generate from Gemini
    const mockInsight = `The community demonstrates strong engagement with emerging technologies, particularly around AI and ethical implications of modern software. Discussions are predominantly positive (73% sentiment score), with constructive debates about different approaches and implementation strategies.

Key observations: Contributors are knowledgeable and respectful, creating an excellent knowledge-sharing environment. The most active thread on AI ethics has generated substantive arguments from multiple perspectives. Recommendation: Consider creating dedicated sub-threads for resolved topics to reduce redundancy and improve navigation.`

    setInsights(mockInsight)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">AI Community Insights</h2>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">{insights}</p>
      </div>
    </Card>
  )
}
