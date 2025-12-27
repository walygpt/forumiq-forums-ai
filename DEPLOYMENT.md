# ForumIQ Deployment Guide

## Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- Foru.ms API credentials
- Google Gemini API key
- Vercel account (recommended)

### 2. Local Development

```bash
# Clone or create project
cd forumiq

# Install dependencies
npm install

# Create .env.local with your credentials
cat > .env.local << 'EOF'
FORUS_API_KEY=your_forus_api_key
FORUS_INSTANCE_ID=your_forus_instance_id
GEMINI_API_KEY=your_gemini_api_key
EOF

# Start development server
npm run dev

# Visit http://localhost:3000
```

### 3. Building for Production

```bash
# Build the project
npm run build

# Test production build locally
npm start

# Or deploy directly to Vercel
vercel
```

## Deployment Options

### Option A: Vercel (Recommended)

Vercel provides the best experience for Next.js apps:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to your Vercel account
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# - FORUS_API_KEY
# - FORUS_INSTANCE_ID
# - GEMINI_API_KEY
```

### Option B: Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t forumiq .
docker run -p 3000:3000 -e FORUS_API_KEY=... -e GEMINI_API_KEY=... forumiq
```

### Option C: Self-Hosted (Node.js)

```bash
# On your server
git clone <your-repo>
cd forumiq
npm install
npm run build

# Using PM2 for process management
npm install -g pm2
pm2 start npm --name "forumiq" -- start
pm2 save
```

## Environment Variables

All API keys must be set in your deployment environment:

| Variable | Description | Required |
|----------|-------------|----------|
| `FORUS_API_KEY` | Foru.ms API authentication key | Yes |
| `FORUS_INSTANCE_ID` | Your Foru.ms instance ID | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

## Performance Considerations

### Caching
ForumIQ can be enhanced with caching:

```typescript
// Add Vercel KV caching (optional)
npm install @vercel/kv

// In env.local
KV_URL=...
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

### Rate Limiting
Add rate limiting to API routes:

```typescript
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),
})
```

### API Optimization
- Cache thread listings (5 min)
- Cache user profiles (1 hour)
- Don't cache sentiment analysis (real-time)

## Monitoring & Logs

### Vercel Analytics
- Automatic performance monitoring
- Real User Monitoring (RUM)
- Core Web Vitals tracking

### Application Logging
```typescript
// Add to API routes for debugging
console.log('[ForumIQ]', 'Thread fetched:', threadId)
console.error('[ForumIQ] Error:', error.message)
```

### Error Tracking (Optional)
```bash
npm install @sentry/nextjs
vercel env add SENTRY_AUTH_TOKEN
```

## Troubleshooting

### API Key Issues
```bash
# Verify keys are set
echo $FORUS_API_KEY
echo $GEMINI_API_KEY

# Check .env.local exists (development only)
cat .env.local
```

### Gemini API Errors
- Ensure API is enabled in Google Cloud Console
- Check API quotas
- Verify API key has correct permissions

### Foru.ms Connection Issues
- Verify API key is valid
- Check instance ID is correct
- Confirm API endpoint is accessible
- Test with curl: `curl -H "x-api-key: $FORUS_API_KEY" https://api.foru.ms/api/v1/thread`

## Security Best Practices

1. **Never commit .env files**
   ```bash
   # In .gitignore
   .env.local
   .env.*.local
   ```

2. **Use environment variables only**
   - Keys stored server-side only
   - Never expose in client-side code
   - Use process.env.VARIABLE_NAME in API routes

3. **API Key Rotation**
   - Rotate keys periodically
   - Use separate keys for dev/prod
   - Revoke compromised keys immediately

4. **CORS & Security Headers**
   - Configured automatically by Vercel
   - No sensitive data in response headers
   - Validate all user inputs

## Scaling Considerations

### For High Traffic
- Enable Vercel Analytics & monitoring
- Implement caching layer
- Add database for persistent storage (Supabase, Neon)
- Use Upstash Redis for session caching
- Consider pagination for large thread lists

### Database Integration (Optional)
```bash
# Add Supabase for user data
npm install @supabase/supabase-js

# Create tables for:
# - User preferences
# - Saved threads
# - Custom AI prompts
# - Analysis history
```

## Testing Before Production

```bash
# 1. Test locally
npm run dev

# 2. Test build
npm run build
npm start

# 3. Test API endpoints
curl http://localhost:3000/api/forus/threads

# 4. Test AI features
curl -X POST http://localhost:3000/api/ai/summarize \
  -H "Content-Type: application/json" \
  -d '{"threadId":"1","posts":[{"author":"Test","content":"Test content"}]}'
```

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Foru.ms Docs**: https://docs.foru.ms
- **Gemini API**: https://ai.google.dev
- **v0.app**: https://v0.app

---

**Your ForumIQ app is now ready to deploy!**
