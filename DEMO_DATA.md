# ForumIQ Demo Data Guide

This document describes the demo data structure used in ForumIQ for testing and development.

## Thread List Mock Data

```typescript
// components/threads/thread-list.tsx
const mockThreads = [
  {
    id: "1",
    title: "Best Practices for API Design",
    description: "Discussion about REST API best practices and modern approaches",
    postCount: 24,
    createdAt: "2024-12-20",
  },
  {
    id: "2",
    title: "AI and Ethics in Tech",
    description: "Exploring the intersection of artificial intelligence and ethical concerns",
    postCount: 42,
    createdAt: "2024-12-18",
  },
  {
    id: "3",
    title: "Next.js vs Other Frameworks",
    description: "A comprehensive comparison of Next.js with competing frameworks",
    postCount: 18,
    createdAt: "2024-12-15",
  },
]
```

## Post Data Structure

```typescript
interface Post {
  id: string
  author: string
  content: string
  createdAt: string
}
```

## Sentiment Analysis Mock Response

```json
{
  "sentiments": [
    {
      "postId": "1",
      "author": "Alice Johnson",
      "sentiment": "positive",
      "toxicity": "safe",
      "score": 0.95
    },
    {
      "postId": "2",
      "author": "Bob Smith",
      "sentiment": "neutral",
      "toxicity": "safe",
      "score": 0.87
    }
  ]
}
```

## Community Insights Mock Data

```typescript
const mockInsights = [
  {
    title: "Most Active Thread",
    value: "42 posts",
    description: "AI and Ethics in Tech has the highest engagement",
  },
  {
    title: "Overall Sentiment",
    value: "73% Positive",
    description: "Community discussions are constructive and helpful",
  },
  {
    title: "Active Contributors",
    value: "156 users",
    description: "Number of unique users participating in discussions",
  },
]
```

## Switching to Real Data

To connect to real Foru.ms data:

1. **In `components/threads/thread-list.tsx`:**
   ```typescript
   // Replace mock data with API call
   useEffect(() => {
     const fetchThreads = async () => {
       const response = await fetch('/api/forus/threads')
       const threads = await response.json()
       setThreads(threads)
     }
     fetchThreads()
   }, [])
   ```

2. **In `app/api/forus/threads/route.ts`:**
   ```typescript
   // Already configured to call Foru.ms API
   // Just ensure FORUS_API_KEY is set in .env.local
   ```

3. **Update environment variables:**
   ```env
   FORUS_API_KEY=your_actual_key
   FORUS_INSTANCE_ID=your_instance_id
   ```

## Testing AI Features with Mock Data

All AI routes work with mock data:

```bash
# Test thread summarization
curl -X POST http://localhost:3000/api/ai/summarize \
  -H "Content-Type: application/json" \
  -d '{
    "threadId": "1",
    "posts": [
      {"author": "Alice", "content": "REST APIs are the best choice"},
      {"author": "Bob", "content": "GraphQL offers more flexibility"}
    ]
  }'

# Test sentiment analysis
curl -X POST http://localhost:3000/api/ai/sentiment \
  -H "Content-Type: application/json" \
  -d '{
    "posts": [
      {"id": "1", "author": "Alice", "content": "Great discussion!"}
    ]
  }'

# Test reply suggestion
curl -X POST http://localhost:3000/api/ai/reply-suggestion \
  -H "Content-Type: application/json" \
  -d '{
    "threadTitle": "API Design",
    "posts": [{"author": "Alice", "content": "REST is best"}]
  }'
```

## Performance Tips for Testing

- Demo data loads instantly (no API latency)
- AI responses use fast Gemini model
- All data stored in memory (no database overhead)
- Perfect for UI/UX testing and demos

---

**Use demo data for development, switch to real data for production!**
