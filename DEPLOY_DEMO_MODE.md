# Deploying ForumIQ with AI Demo Mode

## Quick Deploy Checklist

- [ ] Clone repository
- [ ] Install dependencies
- [ ] Verify environment variables
- [ ] Start dev server or deploy to Vercel
- [ ] Test all AI features
- [ ] Confirm "Demo Mode" badges appear

## Local Development

### Setup

```bash
# Install dependencies
npm install

# Verify .env.local has demo mode enabled
cat .env.local
# Should show: DEMO_MODE=true

# Start development server
npm run dev

# Open http://localhost:3000
```

### Testing All Features

1. **Dashboard** (http://localhost:3000)
   - Should load threads from Foru.ms
   - Thread cards should display

2. **Thread Detail** (Click any thread)
   - Should show "AI Thread Summary" with "Demo Mode" badge
   - Should show "Sentiment Analysis" with "Demo Mode" badge
   - Should load without errors

3. **AI Tools** (http://localhost:3000/ai-tools)
   - Should have "Semantic Search" section with demo badge
   - Should allow entering search queries
   - Results should display

4. **Insights** (http://localhost:3000/insights)
   - Should show community metrics
   - Should show AI-generated insights with demo badge
   - Should display demo-generated community analysis

## Deploy to Vercel

### Step 1: Prepare Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Add AI Demo Mode for ForumIQ"
git push origin main
```

### Step 2: Connect to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to connect GitHub repo
```

### Step 3: Set Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```
FORUS_API_KEY=6b0fd64a-b1a5-4fbe-86c7-d1c6a5650e47
FORUS_INSTANCE_ID=38300586-9de5-4e47-af7b-69e0a8bd47ab
GEMINI_API_KEY=AIzaSyC3PoaRjOwpbXyqEIBjQ4vIOt_yAnnZjS8
DEMO_MODE=true
NEXT_PUBLIC_DEMO_MODE=true
```

### Step 4: Deploy

```bash
# Redeploy with environment variables
vercel --prod
```

### Step 5: Verify Deployment

1. Visit your Vercel deployment URL
2. Test each page (Dashboard, Thread Detail, AI Tools, Insights)
3. Confirm "Demo Mode" badges appear on AI features
4. Check console for any errors

## Post-Hackathon: Switch to Live API

When ready to use live Gemini API:

### Option A: Update Environment Variables (Recommended)

In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Change `DEMO_MODE` to `false`
3. Change `NEXT_PUBLIC_DEMO_MODE` to `false`
4. Ensure `GEMINI_API_KEY` is your real API key
5. Vercel auto-redeploys with new variables

**No code changes needed.**

### Option B: Code Update

```bash
# In .env.local (for local dev)
DEMO_MODE=false
NEXT_PUBLIC_DEMO_MODE=false

npm run dev
```

## Troubleshooting

### Issue: "Demo Mode" badge not showing

**Solution**:
- Verify `NEXT_PUBLIC_DEMO_MODE=true` in environment
- Check browser console for errors
- Restart dev server: `Ctrl+C` then `npm run dev`

### Issue: AI features return errors

**Solution**:
- Check that `DEMO_MODE=true`
- Verify `.env.local` is loading
- Check server console for "[ForumIQ]" log messages
- Verify `GEMINI_API_KEY` is set (even if demo mode)

### Issue: Foru.ms threads not loading

**Solution**:
- Verify `FORUS_API_KEY` is correct
- Verify `FORUS_INSTANCE_ID` is correct
- Check API connectivity: `curl https://api.foru.ms/api/v1/thread`
- Check server console for API errors

### Issue: Vercel deployment fails

**Solution**:
```bash
# Clear build cache
vercel env pull

# Verify .env.local locally
cat .env.local

# Retry deployment
vercel --prod --prod
```

## Performance Notes

### Demo Mode Benefits

- ✅ Faster response times (instant vs API call)
- ✅ Zero external API latency
- ✅ Works offline
- ✅ No rate limiting concerns
- ✅ Predictable performance

### Live Mode Notes

- ~200-500ms per Gemini API call
- Subject to quota limits
- Requires internet connectivity
- Real-time AI responses

## Security

### Demo Mode

- No sensitive data in demo responses
- All mock data is generic/public
- Safe to share deployment URL

### Live Mode

- Keep `GEMINI_API_KEY` private
- Never commit real keys to git
- Use Vercel's environment variables feature
- Consider rotating keys periodically

## Monitoring

### Local Development

Check server logs for demo mode usage:

```bash
# These indicate fallback to demo mode
[ForumIQ] Gemini API failed, using demo response
[ForumIQ] Sentiment analysis failed
```

### Vercel Deployment

Check function logs:
1. Go to Vercel Dashboard
2. Select your deployment
3. Go to "Functions" tab
4. Click `/api/ai/*` functions
5. Check recent logs

Look for "[ForumIQ]" messages to see demo mode usage.

## File Structure

```
forumiq/
├── .env.local                    ← Demo mode enabled
├── lib/
│   ├── gemini-ai.ts             ← Original (unchanged)
│   ├── gemini-ai-fallback.ts     ← New (wrapper with fallback)
│   └── demo-responses.ts          ← New (mock data)
├── app/api/ai/
│   ├── summarize/route.ts         ← Updated (uses fallback)
│   ├── sentiment/route.ts         ← Updated (uses fallback)
│   ├── reply-suggestion/route.ts  ← Updated (uses fallback)
│   ├── semantic-search/route.ts   ← Updated (uses fallback)
│   └── ai-insights/route.ts       ← Updated (uses fallback)
├── components/ai/
│   ├── ai-thread-summary.tsx      ← Updated (shows badge)
│   └── sentiment-analysis.tsx     ← Updated (shows badge)
└── components/layout/
    └── header.tsx                 ← Updated (shows header indicator)
```

## Success Criteria

✅ Deployment is successful
✅ All pages load without errors
✅ AI features show "Demo Mode" badge
✅ No console errors in browser
✅ All 5 AI endpoints return 200 OK
✅ Demo responses are semantically rich
✅ App is production-ready for judges

---

**ForumIQ is now deployed and ready for hackathon evaluation.**
