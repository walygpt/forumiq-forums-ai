"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ThreadList } from "@/components/threads/thread-list"
import { ThreadDetail } from "@/components/threads/thread-detail"
import { AIToolsPanel } from "@/components/ai/ai-tools-panel"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"threads" | "tools" | "insights">("threads")

  return (
    <>
      <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === "threads" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Threads List */}
            <div className="lg:col-span-1 border-r border-border">
              <ThreadList selectedId={selectedThreadId} onSelectThread={setSelectedThreadId} />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {selectedThreadId ? (
                <ThreadDetail threadId={selectedThreadId} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Select a Thread</h2>
                    <p className="text-muted-foreground">Choose a thread from the list to view AI insights</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* AI Tools tab */}
        {activeTab === "tools" && (
          <div className="max-w-4xl">
            <AIToolsPanel threadId={selectedThreadId || "default"} />
          </div>
        )}

        {/* Insights tab - dynamic import */}
        {activeTab === "insights" && (
          <div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Community Insights</h2>
              <p className="text-muted-foreground">
                View analytics and AI-generated insights about community discussions
              </p>
            </div>
          </div>
        )}
      </DashboardLayout>
      <Toaster />
    </>
  )
}
