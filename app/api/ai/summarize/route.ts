import { generateThreadSummary } from "@/lib/gemini-ai-fallback"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { threadId, posts } = await request.json()

    if (!posts || posts.length === 0) {
      return NextResponse.json({ error: "No posts provided" }, { status: 400 })
    }

    const { summary, mode } = await generateThreadSummary(posts)

    return NextResponse.json({ summary, mode })
  } catch (error) {
    console.error("Summary generation failed:", error)
    return NextResponse.json({
      summary: "Unable to generate summary at this time. Please try again.",
      mode: "demo",
    })
  }
}
