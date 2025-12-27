/**
 * Gemini AI Integration
 * Handles prompt engineering and structured AI responses
 *
 * Features:
 * - Thread summarization with key arguments and consensus
 * - Multi-dimensional sentiment analysis (sentiment + toxicity)
 * - Context-aware reply suggestions
 * - Semantic search with relevance scoring
 */

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

const model = "gemini-2.0-flash-exp"

/**
 * Generate TL;DR summary of forum thread
 * EXAMPLE USE: Used in AIThreadSummary component to analyze discussions
 */
export async function generateThreadSummary(
  posts: Array<{
    author: string
    content: string
  }>,
): Promise<string> {
  const aiModel = genAI.getGenerativeModel({ model })

  const postsText = posts.map((p) => `${p.author}: ${p.content}`).join("\n\n")

  const prompt = `You are an expert forum analyst. Analyze this discussion and provide a structured summary:

FORUM DISCUSSION:
${postsText}

Provide a concise summary including:
1. **Main Topic**: What is being discussed?
2. **Key Arguments**: What are the main points being made?
3. **Consensus**: What do most people agree on?
4. **Disagreements**: Where do opinions differ?
5. **Takeaway**: The most important insight from this discussion

Format: Use clear headers and be concise but thorough.`

  const result = await aiModel.generateContent(prompt)
  const text = result.response.text()
  return text
}

/**
 * Analyze sentiment and toxicity of posts
 * EXAMPLE USE: Used in SentimentAnalysis component for moderation
 */
export async function analyzeSentiment(
  posts: Array<{
    id: string
    author: string
    content: string
  }>,
): Promise<
  Array<{
    postId: string
    author: string
    sentiment: "positive" | "neutral" | "negative"
    toxicity: "safe" | "mild" | "severe"
    score: number
  }>
> {
  const aiModel = genAI.getGenerativeModel({ model })

  const postsText = posts.map((p) => `[ID: ${p.id}]\nAuthor: ${p.author}\nContent: ${p.content}`).join("\n---\n")

  const prompt = `Analyze each post for sentiment and toxicity. For each post, determine:
1. sentiment: 'positive', 'neutral', or 'negative' (based on tone and opinion)
2. toxicity: 'safe', 'mild', or 'severe' (based on language appropriateness)
3. score: 0.0-1.0 confidence score

POSTS TO ANALYZE:
${postsText}

Respond with ONLY a valid JSON array (no markdown, no explanations):
[
  {
    "postId": "string",
    "author": "string",
    "sentiment": "positive|neutral|negative",
    "toxicity": "safe|mild|severe",
    "score": 0.0-1.0
  }
]`

  try {
    const result = await aiModel.generateContent(prompt)
    const text = result.response.text().trim()

    // Clean response - remove markdown code blocks if present
    const cleaned = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim()

    const parsed = JSON.parse(cleaned)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error("Sentiment parsing failed:", error)
    return []
  }
}

/**
 * Generate intelligent reply suggestion
 * EXAMPLE USE: Used in AIReplyAssistant component for user engagement
 */
export async function generateReplyAssistant(context: {
  threadTitle: string
  posts: Array<{ author: string; content: string }>
}): Promise<string> {
  const aiModel = genAI.getGenerativeModel({ model })

  const postsText = context.posts.map((p) => `${p.author}: ${p.content}`).join("\n\n")

  const prompt = `Based on this forum thread, suggest a thoughtful and helpful reply.

THREAD TITLE: ${context.threadTitle}

DISCUSSION:
${postsText}

Your suggested reply should:
1. Address the main points discussed
2. Maintain a respectful and constructive tone
3. Add genuine value to the conversation
4. Be concise but substantive (2-3 sentences)
5. Match the forum's tone and style

Provide ONLY the suggested reply text, no other commentary.`

  const result = await aiModel.generateContent(prompt)
  return result.response.text()
}

/**
 * Perform semantic search across threads
 * EXAMPLE USE: Used in SemanticSearch component for intelligent discovery
 */
export async function semanticSearch(
  query: string,
  threads: Array<{
    id: string
    title: string
    content: string
  }>,
): Promise<
  Array<{
    id: string
    title: string
    relevanceScore: number
    reason: string
  }>
> {
  const aiModel = genAI.getGenerativeModel({ model })

  const threadsText = threads.map((t) => `[ID: ${t.id}]\nTitle: ${t.title}\nContent: ${t.content}`).join("\n---\n")

  const prompt = `Find the most semantically relevant threads for this search query.
Focus on MEANING, not just keywords. A thread about "API design principles" might match "best ways to structure services".

SEARCH QUERY: "${query}"

AVAILABLE THREADS:
${threadsText}

For each thread, evaluate relevance by meaning (0.0-1.0 score).

Respond with ONLY a valid JSON array (no markdown, no explanations):
[
  {
    "id": "string",
    "title": "string",
    "relevanceScore": 0.0-1.0,
    "reason": "brief explanation of relevance"
  }
]

Sort by relevanceScore descending.`

  try {
    const result = await aiModel.generateContent(prompt)
    const text = result.response.text().trim()

    const cleaned = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim()

    const parsed = JSON.parse(cleaned)
    return (Array.isArray(parsed) ? parsed : []).sort((a, b) => b.relevanceScore - a.relevanceScore)
  } catch (error) {
    console.error("Semantic search parsing failed:", error)
    return []
  }
}

/**
 * Generate community-wide insights
 * EXAMPLE USE: Used in AIInsightsText component for dashboard overview
 */
export async function generateCommunityInsights(
  stats: {
    totalThreads: number
    totalPosts: number
    activeUsers: number
    overallSentiment: string
  },
  recentThreads: Array<{ title: string; postCount: number; sentiment: string }>,
): Promise<string> {
  const aiModel = genAI.getGenerativeModel({ model })

  const threadsText = recentThreads
    .map((t) => `- ${t.title} (${t.postCount} posts, ${t.sentiment} sentiment)`)
    .join("\n")

  const prompt = `Generate a brief, insightful analysis of this forum community. Write in natural language.

COMMUNITY STATS:
- Total Threads: ${stats.totalThreads}
- Total Posts: ${stats.totalPosts}
- Active Users: ${stats.activeUsers}
- Overall Sentiment: ${stats.overallSentiment}

RECENT POPULAR THREADS:
${threadsText}

Provide 3-4 sentences analyzing:
1. Community health and engagement
2. Key discussion topics and trends
3. Recommendations for community moderators

Write naturally, no bullet points.`

  const result = await aiModel.generateContent(prompt)
  return result.response.text()
}
