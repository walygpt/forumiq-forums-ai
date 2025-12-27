"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

interface AIToolsPanelProps {
  threadId: string
}

export function AIToolsPanel({ threadId }: AIToolsPanelProps) {
  return (
    <Card className="bg-card border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">AI Tools</h2>
        </div>
      </div>
      <div className="p-6 grid grid-cols-2 gap-4">
        <Button variant="outline" className="justify-start bg-transparent">
          Generate Reply
        </Button>
        <Button variant="outline" className="justify-start bg-transparent">
          Semantic Search
        </Button>
        <Button variant="outline" className="justify-start bg-transparent">
          Toxicity Check
        </Button>
        <Button variant="outline" className="justify-start bg-transparent">
          Key Arguments
        </Button>
      </div>
    </Card>
  )
}
