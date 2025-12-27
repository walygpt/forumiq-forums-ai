"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, Zap, Target } from "lucide-react"

export default function AIToolsPage() {
  const [activeTab, setActiveTab] = useState<"threads" | "tools" | "insights">("tools")
  const [content, setContent] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedTool, setSelectedTool] = useState<"summarize" | "sentiment" | "reply" | null>(null)

  const tools = [
    {
      id: "summarize",
      name: "Thread Summarizer",
      description: "Generate AI summaries of long forum discussions",
      icon: Sparkles,
    },
    {
      id: "sentiment",
      name: "Sentiment Analyzer",
      description: "Analyze tone and detect potentially toxic content",
      icon: Target,
    },
    {
      id: "reply",
      name: "Reply Assistant",
      description: "Get intelligent reply suggestions based on context",
      icon: Zap,
    },
  ]

  const handleAnalyze = async (tool: string) => {
    if (!content.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`/api/ai/${tool}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          posts: [{ author: "User", content }],
        }),
      })

      const data = await response.json()
      setResult(data.summary || data.suggestion || JSON.stringify(data))
    } catch (error) {
      console.error("Analysis failed:", error)
      setResult("Failed to analyze. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Tools</h1>
          <p className="text-foreground/60">Powerful AI-powered utilities for forum analysis</p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Card
                key={tool.id}
                className={`bg-card border-border cursor-pointer transition-all ${
                  selectedTool === tool.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedTool(tool.id as "summarize" | "sentiment" | "reply")}
              >
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">{tool.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Tool Interface */}
        {selectedTool && (
          <Card className="bg-card border-border">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">
                {tools.find((t) => t.id === selectedTool)?.name}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Content to Analyze</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste forum content here..."
                  className="min-h-32 bg-input border-border text-foreground resize-none"
                />
              </div>

              <Button
                onClick={() => handleAnalyze(selectedTool)}
                disabled={loading || !content.trim()}
                className="w-full"
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? "Analyzing..." : "Analyze"}
              </Button>

              {result && (
                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <p className="text-sm text-foreground/80 whitespace-pre-wrap">{result}</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
