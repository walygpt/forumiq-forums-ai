"use client"

import { MessageSquare, Zap, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeTab: "threads" | "tools" | "insights"
  onTabChange: (tab: "threads" | "tools" | "insights") => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const tabs = [
    {
      id: "threads",
      label: "Threads",
      icon: MessageSquare,
    },
    {
      id: "tools",
      label: "AI Tools",
      icon: Zap,
    },
    {
      id: "insights",
      label: "Insights",
      icon: BarChart3,
    },
  ] as const

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-xs font-bold text-primary-foreground">IQ</span>
          </div>
          <span className="font-bold text-sidebar-foreground">ForumIQ</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <Button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start gap-2"
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </Button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent/30 rounded-lg p-4">
          <p className="text-xs text-sidebar-foreground font-semibold mb-2">Pro Tip</p>
          <p className="text-xs text-sidebar-foreground/70">
            Use AI tools to analyze threads, detect sentiment, and get intelligent reply suggestions.
          </p>
        </div>
      </div>
    </aside>
  )
}
