# ForumIQ - AI-Powered Forum Intelligence Platform

## Overview

ForumIQ is a production-ready, AI-powered intelligence layer built on the **Foru.ms API** that transforms online forum discussions through advanced AI capabilities. It demonstrates how easily Foru.ms data can be enhanced with intelligent features that add real-world value.

## Problem Statement

Forum communities generate valuable discussions, but extracting insights from large volumes of text is challenging:
- Long threads are difficult to summarize
- Moderation requires manual review of all posts
- Finding relevant discussions relies on keyword matching, not meaning
- Generating thoughtful replies requires deep context understanding
- Community health metrics are hard to analyze at scale

## Solution: ForumIQ

ForumIQ uses **Gemini AI** to layer intelligent features on top of Foru.ms data:

### Key Features

#### 1. AI Thread Summary
- Automatically generates TL;DR summaries of forum discussions
- Extracts key arguments and consensus points
- Identifies areas of disagreement
- Shows the most important takeaways
- **API**: `/api/ai/summarize` + Foru.ms `/api/v1/thread/{id}`

#### 2. Sentiment & Toxicity Analysis
- Analyzes emotional tone of each post
- Detects potentially toxic or abusive language
- Highlights problematic content for moderation
- Provides confidence scores for moderation support
- **API**: `/api/ai/sentiment` + Foru.ms `/api/v1/post`

#### 3. AI Reply Assistant
- Suggests intelligent, contextual replies to threads
- Matches forum tone and discussion context
- Helps users contribute meaningful comments
- Prevents repetition by understanding existing arguments
- **API**: `/api/ai/reply-suggestion`

#### 4. Semantic Search
- Search threads by meaning, not keywords
- Finds discussions about "API design" when searching "how to structure services"
- Ranks results by semantic relevance
- Surfaces hidden related discussions
- **API**: `/api/ai/semantic-search`

#### 5. Community Insights Dashboard
- Real-time community health metrics
- Most active threads and heated discussions
- Overall sentiment analysis
- AI-generated natural language insights
- User engagement statistics

## Tech Stack

### Frontend
- **Next.js 14** (App Router) - Modern full-stack framework
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Beautiful, responsive design
- **shadcn/ui** - Premium component library
- **Server Actions** - Seamless server-client communication

### Backend & AI
- **Foru.ms API** - Headless forum backend
  - `/api/v1/thread` - List and fetch threads
  - `/api/v1/post` - Fetch and create posts
  - `/api/v1/user` - User information
- **Gemini API** - Prompt-engineered AI responses
  - Thread summarization
  - Sentiment analysis
  - Reply suggestions
  - Semantic search

### Deployment
- **Vercel** - Serverless deployment
- **Environment variables** - Secure API key management
- **API Routes** - Next.js serverless functions

## Foru.ms Integration

ForumIQ demonstrates seamless Foru.ms integration:

### Endpoints Used

```typescript
// List threads (app/components/threads/thread-list.tsx)
GET /api/v1/thread
```

```typescript
// Get thread details with posts
GET /api/v1/thread/{id}
GET /api/v1/post?thread_id={threadId}
```

```typescript
// Get user information
GET /api/v1/user/{userId}
```

```typescript
// Create new reply (after AI suggestion)
POST /api/v1/post
{
  "thread_id": "string",
  "content": "string"
}
```

### Integration Benefits

ForumIQ shows how simple it is to:
1. **Fetch forum data** with Foru.ms APIs
2. **Enhance with AI** using Gemini
3. **Deploy instantly** to Vercel
4. **Scale effortlessly** with serverless functions

No complex infrastructure needed - just API calls and intelligent prompts!

## Project Structure

```
forumiq/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Main dashboard
│   ├── insights/page.tsx          # Insights & analytics
│   ├── ai-tools/page.tsx          # AI tools interface
│   ├── api/
│   │   └── ai/
│   │       ├── summarize/route.ts # Thread summarization
│   │       ├── sentiment/route.ts # Sentiment analysis
│   │       ├── reply-suggestion/  # Reply assistant
│   │       └── semantic-search/   # Semantic search
│   └── globals.css                # Theme & styling
│
├── components/
│   ├── layout/
│   │   ├── dashboard-layout.tsx   # Main layout wrapper
│   │   ├── header.tsx             # Top header
│   │   └── sidebar.tsx            # Navigation sidebar
│   ├── threads/
│   │   ├── thread-list.tsx        # Thread listings
│   │   └── thread-detail.tsx      # Thread view with AI features
│   ├── ai/
│   │   ├── ai-thread-summary.tsx  # Summary component
│   │   ├── sentiment-analysis.tsx # Sentiment display
│   │   ├── ai-reply-assistant.tsx # Reply suggestion
│   │   └── semantic-search.tsx    # Search interface
│   └── insights/
│       ├── community-insights.tsx # Metrics cards
│       └── ai-insights-text.tsx   # Narrative insights
│
├── lib/
│   ├── forus-api.ts              # Foru.ms API wrapper
│   └── gemini-ai.ts              # Gemini AI integration
│
└── README.md                      # This file
```

## Getting Started

### Prerequisites
- Node.js 18+
- Foru.ms API key
- Gemini API key

### Environment Variables

Create `.env.local`:

```env
# Foru.ms API
FORUS_API_KEY=your_forums_api_key
FORUS_INSTANCE_ID=your_instance_id

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Demo Mode
DEMO_MODE=true
NEXT_PUBLIC_DEMO_MODE=true
```

### Installation & Development

```bash
# Install dependencies (auto-detected)
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

## Key Screens

### Dashboard (Main)
- Thread list with AI-powered sorting
- Thread detail view with multiple AI analyses
- Real-time sentiment and toxicity detection
- AI reply suggestion with edit capability

### Insights Page
- Community health metrics
- AI-generated insights
- Semantic search interface
- Most active discussions

### AI Tools Page
- Standalone AI analysis tools
- Batch analysis interface
- Direct content upload
- Result export

## AI Prompts & Features

### 1. Thread Summarization Prompt

```
You are an expert forum analyst. Analyze this discussion and provide a structured summary:

[Forum posts]

Provide a concise summary including:
1. **Main Topic**: What is being discussed?
2. **Key Arguments**: What are the main points being made?
3. **Consensus**: What do most people agree on?
4. **Disagreements**: Where do opinions differ?
5. **Takeaway**: The most important insight from this discussion
```

### 2. Sentiment Analysis Prompt

```
Analyze each post for sentiment and toxicity.

For each post, determine:
1. sentiment: 'positive', 'neutral', or 'negative'
2. toxicity: 'safe', 'mild', or 'severe'
3. score: 0.0-1.0 confidence

Respond with JSON array (no markdown).
```

### 3. Reply Suggestion Prompt

```
Based on this forum thread, suggest a thoughtful and helpful reply.

Your suggestion should:
1. Address the main points discussed
2. Maintain a respectful and constructive tone
3. Add genuine value to the conversation
4. Be concise but substantive (2-3 sentences)
5. Match the forum's tone and style

Provide ONLY the suggested reply text.
```

### 4. Semantic Search Prompt

```
Find the most semantically relevant threads for this search query.
Focus on MEANING, not just keywords.

Query: "[user query]"

For each thread, evaluate relevance by meaning (0.0-1.0 score).

Respond with JSON array sorted by relevanceScore descending.
```

## Performance Optimizations

- **Server Components** for reduced bundle size
- **Streaming AI responses** for better UX
- **Caching** with Vercel KV (optional)
- **Optimistic updates** in UI
- **Lazy loading** of thread details
- **Search debouncing** for API efficiency

## Hackathon Track: AI & Intelligence

ForumIQ is designed to win in:

1. **Technical Excellence**
   - Clean, well-structured codebase
   - Proper error handling and loading states
   - Type-safe TypeScript throughout
   - Efficient API usage

2. **Innovation & Originality**
   - Unique application of AI to forum moderation/UX
   - Semantic search as competitive advantage
   - AI reply assistant improves user engagement
   - Real business value

3. **Real-World Impact**
   - Solves actual problems for forum communities
   - Improves moderation efficiency
   - Increases user engagement
   - Showcases Foru.ms capabilities

4. **Quality & Presentation**
   - Premium Vercel-style UI/UX
   - Smooth animations and interactions
   - Clear documentation
   - Production-ready code

## Future Enhancements

- User authentication with Supabase
- Persistent conversation history
- Custom AI model fine-tuning
- Advanced analytics dashboard
- Moderation workflow automation
- Multi-language support
- Voice-based thread creation
- Mobile app version

## Security Considerations

- API keys stored in environment variables (never hardcoded)
- No sensitive user data exposed
- Input validation on all APIs
- CORS protection via Vercel deployment
- Rate limiting for AI API calls (recommended)
- XSS/CSRF protection via Next.js defaults

## License

Built for Foru.ms x v0 by Vercel Hackathon

## Contact & Support

For questions about ForumIQ or Foru.ms integration:
- v0.app - Build new features
- Foru.ms Docs - API reference
- Vercel Docs - Deployment help

---

**Made with by v0 for the Foru.ms x Vercel Hackathon**
