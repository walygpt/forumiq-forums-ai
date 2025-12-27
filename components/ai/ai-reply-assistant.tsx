"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Zap, Copy, Send, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Post {
  id: string
  author: string
  content: string
  createdAt: string
}

interface AIReplyAssistantProps {
  threadTitle: string
  posts: Post[]
}

export function AIReplyAssistant({ threadTitle, posts }: AIReplyAssistantProps) {
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [edited, setEdited] = useState(false)
  const [posted, setPosted] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const generateSuggestion = async () => {
    setLoading(true)
    setPosted(false)
    try {
      const response = await fetch("/api/ai/reply-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadTitle, posts }),
      })
      const data = await response.json()
      setSuggestion(data.suggestion)
    } catch (error) {
      console.error("[v0] Failed to generate suggestion:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generateSuggestion()
  }, [threadTitle])

  const handleCopy = async () => {
    if (suggestion) {
      await navigator.clipboard.writeText(suggestion)
      setCopied(true)
      toast({
        title: "Copied",
        description: "Reply suggestion copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handlePostReply = () => {
    setPosted(true)
    toast({
      title: "Success",
      description: "Your reply has been posted to the thread",
    })
    // Optionally clear or reset
    setTimeout(() => {
      setSuggestion(null)
      setEdited(false)
    }, 2000)
  }

  return (
    <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold text-foreground">AI Reply Suggestion</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-5 h-5 text-accent animate-spin" />
            <span className="ml-2 text-sm text-muted-foreground">Generating reply...</span>
          </div>
        ) : suggestion ? (
          <div className="space-y-4">
            <Textarea
              value={suggestion}
              onChange={(e) => {
                setSuggestion(e.target.value)
                setEdited(true)
              }}
              className="min-h-24 bg-background/50 border-border text-foreground resize-none"
              placeholder="Edit the suggestion..."
              disabled={posted}
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="gap-2 bg-transparent"
                onClick={handleCopy}
                disabled={posted}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
              <Button size="sm" className="gap-2 ml-auto" onClick={handlePostReply} disabled={posted}>
                {posted ? (
                  <>
                    <Check className="w-4 h-4" />
                    Posted
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Post Reply
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">No suggestion available</p>
          </div>
        )}
      </div>
    </Card>
  )
}
