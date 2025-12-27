"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Clock } from "lucide-react"

interface Thread {
  id: string
  title: string
  description: string
  postCount: number
  createdAt: string
}

interface ThreadListProps {
  selectedId: string | null
  onSelectThread: (id: string) => void
}

export function ThreadList({ selectedId, onSelectThread }: ThreadListProps) {
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - will be replaced with Foru.ms API call
    const mockThreads: Thread[] = [
      {
        id: "1",
        title: "Best Practices for API Design",
        description: "Discussion about REST API best practices and modern approaches",
        postCount: 24,
        createdAt: "2024-12-20",
      },
      {
        id: "2",
        title: "AI and Ethics in Tech",
        description: "Exploring the intersection of artificial intelligence and ethical concerns",
        postCount: 42,
        createdAt: "2024-12-18",
      },
      {
        id: "3",
        title: "Next.js vs Other Frameworks",
        description: "A comprehensive comparison of Next.js with competing frameworks",
        postCount: 18,
        createdAt: "2024-12-15",
      },
    ]
    setThreads(mockThreads)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="p-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-card rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Forum Threads</h2>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="space-y-2 p-4">
          {threads.map((thread) => (
            <Button
              key={thread.id}
              onClick={() => onSelectThread(thread.id)}
              variant={selectedId === thread.id ? "default" : "ghost"}
              className="w-full justify-start h-auto p-3 text-left"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm line-clamp-2">{thread.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{thread.description}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {thread.postCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {thread.createdAt}
                  </span>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
