/**
 * API Route: GET /api/forus/threads
 * Demonstrates Foru.ms API integration
 * Uses /api/v1/thread endpoint
 */

import { getThreads } from "@/lib/forus-api"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const threads = await getThreads()
    return NextResponse.json(threads)
  } catch (error) {
    console.error("Failed to fetch threads:", error)
    return NextResponse.json({ error: "Failed to fetch threads" }, { status: 500 })
  }
}
