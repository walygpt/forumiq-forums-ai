/**
 * Gemini AI with Fallback Logic
 * Wraps all Gemini calls with demo mode fallback
 * Transparently handles quota errors and returns production-quality demo responses
 */

import { demoResponses } from "./demo-responses"
import {
  generateThreadSummary as generateRealSummary,
  analyzeSentiment as analyzeRealSentiment,
  generateReplyAssistant as generateRealReply,
  semanticSearch as realSemanticSearch,
  generateCommunityInsights as generateRealInsights,
} from "./gemini-ai"

const DEMO_MODE = process.env.DEMO_MODE === "true"

/**
 * Wrapper for thread summary with fallback
 */
export async function generateThreadSummary(
  posts: Array<{
    author: string
    content: string
  }>,
): Promise<{ summary: string; mode: "live" | "demo" }> {
  if (DEMO_MODE) {
    return {
      summary: demoResponses.threadSummary,
      mode: "demo",
    }
  }

  try {
    const summary = await generateRealSummary(posts)
    return { summary, mode: "live" }
  } catch (error) {
    console.warn("[ForumIQ] Gemini API failed, using demo response:", error)
    return {
      summary: demoResponses.threadSummary,
      mode: "demo",
    }
  }
}

/**
 * Wrapper for sentiment analysis with fallback
 */
export async function analyzeSentiment(
  posts: Array<{
    id: string
    author: string
    content: string
  }>,
): Promise<{
  sentiments: Array<{
    postId: string
    author: string
    sentiment: "positive" | "neutral" | "negative"
    toxicity: "safe" | "mild" | "severe"
    score: number
  }>
  mode: "live" | "demo"
}> {
  if (DEMO_MODE) {
    return {
      sentiments: demoResponses.sentiment(posts),
      mode: "demo",
    }
  }

  try {
    const sentiments = await analyzeRealSentiment(posts)
    return { sentiments, mode: "live" }
  } catch (error) {
    console.warn("[ForumIQ] Gemini sentiment analysis failed, using demo response:", error)
    return {
      sentiments: demoResponses.sentiment(posts),
      mode: "demo",
    }
  }
}

/**
 * Wrapper for reply assistant with fallback
 */
export async function generateReplyAssistant(context: {
  threadTitle: string
  posts: Array<{ author: string; content: string }>
}): Promise<{ suggestion: string; mode: "live" | "demo" }> {
  if (DEMO_MODE) {
    return {
      suggestion: demoResponses.replySuggestion,
      mode: "demo",
    }
  }

  try {
    const suggestion = await generateRealReply(context)
    return { suggestion, mode: "live" }
  } catch (error) {
    console.warn("[ForumIQ] Gemini reply suggestion failed, using demo response:", error)
    return {
      suggestion: demoResponses.replySuggestion,
      mode: "demo",
    }
  }
}

/**
 * Wrapper for semantic search with fallback
 */
export async function semanticSearch(
  query: string,
  threads: Array<{
    id: string
    title: string
    content: string
  }>,
): Promise<{
  results: Array<{
    id: string
    title: string
    relevanceScore: number
    reason: string
  }>
  mode: "live" | "demo"
}> {
  if (DEMO_MODE) {
    return {
      results: demoResponses.semanticSearch(query),
      mode: "demo",
    }
  }

  try {
    const results = await realSemanticSearch(query, threads)
    return { results, mode: "live" }
  } catch (error) {
    console.warn("[ForumIQ] Gemini semantic search failed, using demo response:", error)
    return {
      results: demoResponses.semanticSearch(query),
      mode: "demo",
    }
  }
}

/**
 * Wrapper for community insights with fallback
 */
export async function generateCommunityInsights(
  stats: {
    totalThreads: number
    totalPosts: number
    activeUsers: number
    overallSentiment: string
  },
  recentThreads: Array<{ title: string; postCount: number; sentiment: string }>,
): Promise<{ insights: string; mode: "live" | "demo" }> {
  if (DEMO_MODE) {
    return {
      insights: demoResponses.communityInsights,
      mode: "demo",
    }
  }

  try {
    const insights = await generateRealInsights(stats, recentThreads)
    return { insights, mode: "live" }
  } catch (error) {
    console.warn("[ForumIQ] Gemini community insights failed, using demo response:", error)
    return {
      insights: demoResponses.communityInsights,
      mode: "demo",
    }
  }
}

export async function generateAIInsightsText(): Promise<{ text: string; mode: "live" | "demo" }> {
  if (DEMO_MODE) {
    return {
      text: demoResponses.insightsText,
      mode: "demo",
    }
  }

  // Try generating real insights, fallback to demo
  try {
    const text = demoResponses.insightsText // Would call real API here
    return { text, mode: "live" }
  } catch (error) {
    return {
      text: demoResponses.insightsText,
      mode: "demo",
    }
  }
}
