/**
 * Foru.ms API Integration
 * Handles all communication with the Foru.ms headless backend
 *
 * FORU.MS ENDPOINTS USED:
 * - /api/v1/thread        - List threads
 * - /api/v1/thread/{id}   - Get thread details
 * - /api/v1/post          - Get posts
 * - /api/v1/user          - Get user information
 */

const API_BASE = "https://api.foru.ms"
const API_KEY = process.env.FORUS_API_KEY
const INSTANCE_ID = process.env.FORUS_INSTANCE_ID

interface ForusRequestInit extends RequestInit {
  headers?: Record<string, string>
}

async function forusApi<T>(endpoint: string, options?: ForusRequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`
  const headers = {
    "x-api-key": API_KEY || "",
    "Content-Type": "application/json",
    ...options?.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`Foru.ms API error: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

// Thread endpoints
export async function getThreads() {
  // /api/v1/thread - List all threads
  return forusApi("/api/v1/thread")
}

export async function getThread(id: string) {
  // /api/v1/thread/{id} - Get specific thread with metadata
  return forusApi(`/api/v1/thread/${id}`)
}

// Post endpoints
export async function getPosts(threadId: string) {
  // /api/v1/post - List posts (filtered by threadId)
  return forusApi(`/api/v1/post?thread_id=${threadId}`)
}

// User endpoints
export async function getUser(userId: string) {
  // /api/v1/user - Get user information
  return forusApi(`/api/v1/user/${userId}`)
}

export async function createPost(threadId: string, content: string) {
  // /api/v1/post - Create new post
  return forusApi("/api/v1/post", {
    method: "POST",
    body: JSON.stringify({
      thread_id: threadId,
      content,
    }),
  })
}
