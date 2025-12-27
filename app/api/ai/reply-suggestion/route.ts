import { generateReplyAssistant } from "@/lib/gemini-ai-fallback"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { threadTitle, posts } = await request.json()

    if (!threadTitle || !posts || posts.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { suggestion, mode } = await generateReplyAssistant({
      threadTitle,
      posts,
    })

    return NextResponse.json({ suggestion, mode })
  } catch (error) {
    console.error("Reply suggestion generation failed:", error)
    return NextResponse.json({
      suggestion: "Consider sharing your thoughts on the key points raised in this discussion.",
      mode: "demo",
    })
  }
}
