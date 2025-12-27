import { semanticSearch } from "@/lib/gemini-ai-fallback"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Query required" }, { status: 400 })
    }

    const mockThreads = [
      {
        id: "1",
        title: "Best Practices for API Design",
        content: "Discussion about REST API best practices and modern approaches including design patterns",
      },
      {
        id: "2",
        title: "AI and Ethics in Tech",
        content: "Exploring the intersection of artificial intelligence and ethical concerns in software",
      },
      {
        id: "3",
        title: "Next.js vs Other Frameworks",
        content: "A comprehensive comparison of Next.js with competing frameworks like Remix and Nuxt",
      },
    ]

    const { results, mode } = await semanticSearch(query, mockThreads)

    return NextResponse.json({ results, mode })
  } catch (error) {
    console.error("Semantic search failed:", error)
    return NextResponse.json({
      results: [],
      mode: "demo",
    })
  }
}
