"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { AIThreadSummary } from "@/components/ai/ai-thread-summary"
import { SentimentAnalysis } from "@/components/ai/sentiment-analysis"
import { AIReplyAssistant } from "@/components/ai/ai-reply-assistant"

interface Post {
  id: string
  author: string
  content: string
  createdAt: string
}

interface ThreadDetailProps {
  threadId: string
}

export function ThreadDetail({ threadId }: ThreadDetailProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - will be replaced with Foru.ms API call
    const mockPosts: Post[] = [
      {
        id: "1",
        author: "Alice Johnson",
        content:
          "I think REST APIs are still the best choice for most applications. They're simple and widely supported.",
        createdAt: "2024-12-20T10:00:00Z",
      },
      {
        id: "2",
        author: "Bob Smith",
        content: "Have you considered GraphQL? It offers much better flexibility and reduces over-fetching.",
        createdAt: "2024-12-20T11:30:00Z",
      },
      {
        id: "3",
        author: "Carol Williams",
        content: "Both have their merits. REST is simpler for basic CRUD, but GraphQL shines with complex queries.",
        createdAt: "2024-12-20T13:15:00Z",
      },
    ]
    setPosts(mockPosts)
    setLoading(false)
  }, [threadId])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-card rounded-lg animate-pulse" />
        <div className="h-48 bg-card rounded-lg animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* AI Summary */}
      <AIThreadSummary threadId={threadId} posts={posts} />

      {/* Sentiment Analysis */}
      <SentimentAnalysis posts={posts} />

      {/* AI Reply Assistant */}
      <AIReplyAssistant threadTitle="Best Practices for API Design" posts={posts} />

      {/* Posts */}
      <Card className="bg-card border-border">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Thread Posts</h2>
        </div>
        <div className="divide-y divide-border">
          {posts.map((post) => (
            <div key={post.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold text-foreground text-sm">{post.author}</p>
                <p className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{post.content}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
