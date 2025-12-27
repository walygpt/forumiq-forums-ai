import { analyzeSentiment } from "@/lib/gemini-ai-fallback"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { posts } = await request.json()

    if (!posts || posts.length === 0) {
      return NextResponse.json({ error: "No posts provided" }, { status: 400 })
    }

    const { sentiments, mode } = await analyzeSentiment(posts)

    return NextResponse.json({ sentiments, mode })
  } catch (error) {
    console.error("Sentiment analysis failed:", error)
    return NextResponse.json({
      sentiments: [],
      mode: "demo",
    })
  }
}
