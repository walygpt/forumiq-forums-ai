/**
 * API Route: POST /api/ai/ai-insights
 * Generates natural language community insights
 */

import { generateCommunityInsights } from "@/lib/gemini-ai-fallback"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { stats, recentThreads } = await request.json()

    if (!stats || !recentThreads) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 })
    }

    const { insights, mode } = await generateCommunityInsights(stats, recentThreads)

    return NextResponse.json({ insights, mode })
  } catch (error) {
    console.error("Insights generation failed:", error)
    return NextResponse.json({
      insights: "Community insights are being calculated. Please check back soon.",
      mode: "demo",
    })
  }
}
