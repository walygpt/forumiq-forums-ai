"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, MessageCircle, Users, Flame } from "lucide-react"

interface Insight {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  color: string
}

export function CommunityInsights() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock insights - in production, fetch from API with real Foru.ms data
    const mockInsights: Insight[] = [
      {
        title: "Most Active Thread",
        value: "42 posts",
        description: "AI and Ethics in Tech has the highest engagement",
        icon: <MessageCircle className="w-5 h-5" />,
        color: "from-blue-500 to-blue-600",
      },
      {
        title: "Overall Sentiment",
        value: "73% Positive",
        description: "Community discussions are constructive and helpful",
        icon: <TrendingUp className="w-5 h-5" />,
        color: "from-green-500 to-green-600",
      },
      {
        title: "Active Contributors",
        value: "156 users",
        description: "Number of unique users participating in discussions",
        icon: <Users className="w-5 h-5" />,
        color: "from-purple-500 to-purple-600",
      },
      {
        title: "Hot Discussions",
        value: "8 threads",
        description: "Heated discussions with high engagement and disagreement",
        icon: <Flame className="w-5 h-5" />,
        color: "from-orange-500 to-orange-600",
      },
    ]
    setInsights(mockInsights)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-card rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {insights.map((insight, idx) => (
        <Card key={idx} className={`bg-gradient-to-br ${insight.color}/10 border-border`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">{insight.title}</h3>
              <div className="text-primary">{insight.icon}</div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-2">{insight.value}</p>
            <p className="text-xs text-muted-foreground">{insight.description}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
