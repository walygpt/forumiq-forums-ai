/**
 * API Route: GET /api/forus/thread/[id]
 * Demonstrates Foru.ms API integration
 * Uses /api/v1/thread/{id} endpoint
 */

import { getThread, getPosts } from "@/lib/forus-api"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const [thread, posts] = await Promise.all([getThread(params.id), getPosts(params.id)])

    return NextResponse.json({
      thread,
      posts,
    })
  } catch (error) {
    console.error("Failed to fetch thread:", error)
    return NextResponse.json({ error: "Failed to fetch thread" }, { status: 500 })
  }
}
