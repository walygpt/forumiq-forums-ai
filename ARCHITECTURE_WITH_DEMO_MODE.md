# ForumIQ - Architecture with Demo Mode

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FORUMIQ APP                             │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Frontend (Next.js React Components)                │  │
│  │  ┌────────────────┬──────────────┬──────────────┐   │  │
│  │  │ Dashboard Page │ Thread View  │ AI Tools Page│   │  │
│  │  └────────────────┴──────────────┴──────────────┘   │  │
│  │  ┌────────────────┬──────────────┬──────────────┐   │  │
│  │  │ AI Summary     │ Sentiment    │ Reply Helper │   │  │
│  │  │ (Demo Badge)   │ (Demo Badge) │ (Demo Badge) │   │  │
│  │  └────────────────┴──────────────┴──────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│           │                              │                 │
└───────────┼──────────────────────────────┼─────────────────┘
            ↓                              ↓
┌───────────────────────────────────────────────────────────┐
│  Next.js API Routes (/api/)                             │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  /api/ai/summarize       [+Fallback Wrapper]       │ │
│  │  /api/ai/sentiment       [+Fallback Wrapper]       │ │
│  │  /api/ai/reply-suggestion[+Fallback Wrapper]       │ │
│  │  /api/ai/semantic-search [+Fallback Wrapper]       │ │
│  │  /api/ai/ai-insights     [+Fallback Wrapper]       │ │
│  │  /api/forus/threads      [Foru.ms API]           │ │
│  │  /api/forus/thread/[id]  [Foru.ms API]           │ │
│  └─────────────────────────────────────────────────────┘ │
└────────────────┬─────────────────────────┬────────────────┘
                 │                         │
        ┌────────▼────────┐        ┌──────▼────────┐
        │ AI Processing   │        │ Forum Data    │
        │ (Fallback Layer)│        │ Integration   │
        └─────────┬────────┘        └──────┬────────┘
                  │                        │
        ┌─────────▼────────────────────────▼──┐
        │  Decision Logic                     │
        │  ┌──────────────────────────────┐   │
        │  │ if DEMO_MODE = true          │   │
        │  │   → Return demo response     │   │
        │  │ else if GEMINI_API_KEY       │   │
        │  │   → Try live Gemini API      │   │
        │  │   → On failure → demo response│  │
        │  │ else                         │   │
        │  │   → Return fallback message  │   │
        │  └──────────────────────────────┘   │
        └─────────┬──────────────┬───────────┘
                  │              │
        ┌─────────▼──┐  ┌────────▼──────────┐
        │ Demo Data  │  │ Gemini AI API     │
        │ (Hardcoded)│  │ (When enabled)    │
        │ - Summaries│  │ - Real LLM calls  │
        │ - Analysis │  │ - Live responses  │
        │ - Insights │  │ - Fallback to demo│
        └────────────┘  └───────────────────┘
```

## Request Flow Diagram

### In Demo Mode (DEMO_MODE=true)

```
User clicks "Generate Summary"
              │
              ▼
    POST /api/ai/summarize
              │
              ▼
    Check DEMO_MODE env var
              │
              ├─ YES ────────────────────┐
              │                          │
              ▼                          ▼
    Return demo response    Always 200 OK
    { summary, mode: "demo" }
              │
              ▼
    Frontend renders summary
    + Shows "Demo Mode" badge
```

### In Live Mode with Fallback (DEMO_MODE=false)

```
User clicks "Generate Summary"
              │
              ▼
    POST /api/ai/summarize
              │
              ▼
    Try: generateRealSummary()
      (Calls Gemini API)
              │
         ┌────┴────┐
         │          │
         ▼          ▼
      Success    Error/Timeout
         │          │
         ▼          ▼
    Return        Log warning
    live resp     Fall back to
                  demo response
         │          │
         ├──────┬───┘
              ▼
    Return 200 OK
    { summary, mode: "live" or "demo" }
              │
              ▼
    Frontend renders summary
    + Shows badge only if demo
```

## Component Architecture

```
┌─ Header Component
│  └─ Shows "ForumIQ | Beta | AI Demo Mode" indicator
│
├─ Sidebar Component
│  ├─ Dashboard Link
│  ├─ AI Tools Link
│  └─ Insights Link
│
├─ Dashboard Page
│  └─ Thread List Component
│     └─ Each thread links to detail view
│
├─ Thread Detail Page
│  ├─ Thread Content
│  ├─ AIThreadSummary Component
│  │  ├─ Calls /api/ai/summarize
│  │  └─ Shows "Demo Mode" badge
│  ├─ SentimentAnalysis Component
│  │  ├─ Calls /api/ai/sentiment
│  │  └─ Shows "Demo Mode" badge
│  └─ AIReplyAssistant Component
│     ├─ Calls /api/ai/reply-suggestion
│     └─ Shows "Demo Mode" badge
│
├─ AI Tools Page
│  └─ SemanticSearch Component
│     ├─ Calls /api/ai/semantic-search
│     └─ Shows "Demo Mode" badge
│
└─ Insights Page
   ├─ CommunityInsights Component
   │  ├─ Calls /api/ai/ai-insights
   │  └─ Shows "Demo Mode" badge
   └─ StatisticsDisplay Component
      └─ Shows forum metrics
```

## Data Flow

### API Response Format

All AI endpoints now return:

```typescript
{
  // Content field (varies by endpoint)
  summary?: string;        // /summarize
  sentiments?: Array;      // /sentiment
  suggestion?: string;     // /reply-suggestion
  results?: Array;         // /semantic-search
  insights?: string;       // /ai-insights
  
  // Standard field (all endpoints)
  mode: "live" | "demo";   // Indicates response source
}
```

### Component Usage

```typescript
// Components call API
const response = await fetch("/api/ai/summarize", {
  method: "POST",
  body: JSON.stringify({ threadId, posts })
});

const data = await response.json();

// Use content
setSummary(data.summary);

// Display mode indicator
if (data.mode === "demo") {
  showBadge("AI Demo Mode");
}
```

## Environment Variable Control

```bash
# Development (Demo Mode - Default)
DEMO_MODE=true
NEXT_PUBLIC_DEMO_MODE=true
→ App runs with instant demo responses

# Production (Live API - Optional)
DEMO_MODE=false
NEXT_PUBLIC_DEMO_MODE=false
GEMINI_API_KEY=sk_xxxxx
→ App tries live API, falls back to demo

# Hybrid (Fallback for Safety)
DEMO_MODE=false
GEMINI_API_KEY=invalid_or_expired
→ API calls fail, app uses demo response
→ App never breaks, always returns 200 OK
```

## Error Handling Strategy

```
Request arrives at /api/ai/summarize
         │
         ▼
    ┌─────────────────┐
    │ Try to generate │
    │   response      │
    └────┬────────────┘
         │
    ┌────┴──────────────────┐
    │                       │
    ▼                       ▼
 Success               Error/Exception
    │                       │
    ├─────────────┬─────────┤
    │             │         │
    ▼             ▼         ▼
Return 200   Log warning  Demo response
with live    with demo    with demo
response     response     response
    │             │         │
    └─────────────┴─────────┘
                  │
                  ▼
          HTTP 200 OK (Always)
          + Response body
          + Mode indicator
```

## Feature Matrix

| Feature | Live Mode | Demo Mode | Fallback |
|---------|-----------|-----------|----------|
| Thread Summary | ✅ Real | ✅ Demo | ✅ Demo |
| Sentiment | ✅ Real | ✅ Demo | ✅ Demo |
| Reply Helper | ✅ Real | ✅ Demo | ✅ Demo |
| Semantic Search | ✅ Real | ✅ Demo | ✅ Demo |
| Insights | ✅ Real | ✅ Demo | ✅ Demo |
| Error Handling | 200/5xx | Always 200 | Always 200 |
| Performance | ~300ms | <10ms | <10ms |
| Requires API Key | ✅ Yes | ❌ No | ✅ Yes (but fallback) |

## Technology Stack

```
Frontend
├─ Next.js 16 (React 19)
├─ TypeScript
├─ Tailwind CSS v4
└─ shadcn/ui components

Backend
├─ Next.js API Routes
├─ TypeScript
└─ Environment Variables

AI Layer (NEW)
├─ Demo Responses Library (new)
├─ Fallback Wrapper (new)
├─ Google Gemini AI (original - preserved)
└─ Error Handling (enhanced)

Integration
├─ Foru.ms API (original)
└─ File System (demo responses)

Deployment
├─ Vercel
└─ Node.js 20+
```

## Deployment Architecture

```
GitHub Repository
      │
      ▼
Vercel Deployment
      │
      ├─ Build: npm install && npm run build
      │
      ├─ Env Vars:
      │  ├─ DEMO_MODE=true
      │  ├─ NEXT_PUBLIC_DEMO_MODE=true
      │  ├─ FORUS_API_KEY=...
      │  ├─ FORUS_INSTANCE_ID=...
      │  └─ GEMINI_API_KEY=...
      │
      ├─ Runtime:
      │  ├─ Next.js app
      │  ├─ API routes
      │  └─ Static assets
      │
      └─ Output:
         ├─ https://forumiq.vercel.app
         ├─ All AI features working
         └─ Demo Mode enabled
```

## Migration Path (Demo → Live)

```
Current (Hackathon)          Future (Post-Hackathon)
────────────────────────────────────────────────────
DEMO_MODE=true       ──────→  DEMO_MODE=false
NEXT_PUBLIC=true     ──────→  NEXT_PUBLIC=false
Demo responses       ──────→  Live Gemini API
Instant responses    ──────→  300ms+ responses
Zero cost           ──────→  API costs
No quota limits     ──────→  Quota limits
Fallback available  ──────→  Fallback available
No changes needed   ──────→  Zero code changes needed!
```

---

**This architecture ensures ForumIQ is both:**
1. **Hackathon-ready** - Works perfectly with demo mode
2. **Production-ready** - Ready to scale with live APIs
