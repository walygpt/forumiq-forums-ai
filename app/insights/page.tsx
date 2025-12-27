"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { CommunityInsights } from "@/components/insights/community-insights"
import { AIInsightsText } from "@/components/insights/ai-insights-text"
import { SemanticSearch } from "@/components/ai/semantic-search"
import { useState } from "react"

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState<"threads" | "tools" | "insights">("insights")

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Community Insights</h1>
          <p className="text-foreground/60">AI-powered analytics and intelligent discovery</p>
        </div>

        {/* Key Metrics */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Key Metrics</h2>
          <CommunityInsights />
        </div>

        {/* AI Insights */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Community Overview</h2>
          <AIInsightsText />
        </div>

        {/* Semantic Search */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Intelligent Discovery</h2>
          <SemanticSearch />
        </div>
      </div>
    </DashboardLayout>
  )
}
