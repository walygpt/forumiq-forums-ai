/**
 * Demo AI Responses
 * High-quality mock AI responses for offline/demo use
 * Maintains the same response schema as production Gemini API
 * All responses are semantically rich and production-ready
 */

export const demoResponses = {
  threadSummary: `**Main Topic**: This discussion explores scalability approaches and architectural patterns for modern distributed systems.

**Key Arguments**:
- Horizontal scaling enables cost-effective resource management across microservices
- Several contributors emphasize the importance of load balancing and fault tolerance
- Cache-first strategies (Redis, memcached) significantly improve response times
- Database optimization through indexing and query analysis is critical

**Consensus**:
- Most participants agree that "scale from day one" mindset is essential for healthy systems
- The community recognizes that monitoring and observability are non-negotiable
- Investment in DevOps infrastructure pays dividends at scale

**Disagreements**:
- Some advocate for monolithic architectures first, others prefer microservices from the start
- Opinions vary on whether serverless solutions are mature enough for production

**Takeaway**: 
Successful scaling requires thoughtful architecture, robust monitoring, and team alignment—no single solution fits all use cases. The most successful implementations balance pragmatism with forward planning.`,

  sentiment: (posts: Array<{ id: string; author: string }>) => [
    ...posts.map((post, idx) => ({
      postId: post.id,
      author: post.author,
      sentiment: ["positive", "neutral", "negative"][idx % 3] as "positive" | "neutral" | "negative",
      toxicity: ["safe", "safe", "mild"][idx % 3] as "safe" | "mild" | "severe",
      score: 0.85 + Math.random() * 0.15,
    })),
  ],

  replySuggestion: `Great points from everyone! I'd like to add that in my experience, implementing incremental load testing before going to production has saved us from numerous scaling issues. We used tools like k6 and Apache JMeter to simulate peak traffic conditions. One thing that helped tremendously was establishing clear SLAs for response times and then architecting around those constraints. This way, scaling decisions became data-driven rather than guess-based.`,

  semanticSearch: (query: string) => [
    {
      id: "1",
      title: "Building Resilient Microservices Architecture",
      relevanceScore: 0.92,
      reason: "Directly addresses scaling patterns and distributed system design principles relevant to the query",
    },
    {
      id: "2",
      title: "Database Optimization Techniques for Large-Scale Applications",
      relevanceScore: 0.88,
      reason: "Discusses query optimization, indexing strategies, and performance tuning for handling scale",
    },
    {
      id: "3",
      title: "DevOps Practices and CI/CD Pipelines",
      relevanceScore: 0.76,
      reason: "Relates to infrastructure automation and deployment strategies that support scaling operations",
    },
  ],

  communityInsights: `The community shows strong engagement around infrastructure and architectural topics, with a clear emphasis on production-ready solutions. Overall sentiment is positive, indicating a collaborative knowledge-sharing culture. Hot discussions revolve around modern deployment patterns, serverless technologies, and performance optimization. The community would benefit from more documentation around testing strategies and disaster recovery planning—these topics appear in many threads but lack consensus approaches.`,

  insightsText: `This forum demonstrates a mature, technically-focused community engaged in substantive discussions about distributed systems and cloud infrastructure. The diversity of perspectives—from startups adopting serverless to enterprises managing legacy systems—creates rich debate. Key patterns: members actively share battle-tested solutions, emerging consensus around observability tools, and strong interest in cost optimization strategies. The community health is excellent, with constructive debates and knowledge transfer happening organically across experience levels.`,
}
