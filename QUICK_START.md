# ForumIQ Quick Start Guide

Get ForumIQ running in 5 minutes.

## Step 1: Download the Project

Click "Download ZIP" in v0 dashboard and extract it.

## Step 2: Install Dependencies

```bash
cd forumiq
npm install
```

## Step 3: Set Up Environment Variables

Create `.env.local`:

```env
FORUS_API_KEY=6b0fd64a-b1a5-4fbe-86c7-d1c6a5650e47
FORUS_INSTANCE_ID=38300586-9de5-4e47-af7b-69e0a8bd47ab
GEMINI_API_KEY=AIzaSyCN_rPdJiIKYy3VQABSf9Xj4V0nHxLheJA
```

## Step 4: Start Development Server

```bash
npm run dev
```

## Step 5: Open in Browser

Visit: http://localhost:3000

You should see:
- Dashboard with sidebar navigation
- Thread list on the left
- Main content area in the center
- AI-powered features throughout

## What to Try

1. **View Thread Details**
   - Click a thread in the list
   - See AI summary at the top
   - Check sentiment analysis
   - Try the AI reply assistant

2. **Try Semantic Search**
   - Go to "Insights" tab
   - Try searching: "best API design"
   - See meaning-based results

3. **Explore AI Tools**
   - Go to "AI Tools" tab
   - Pick a tool
   - Paste content
   - Watch AI analyze it

## Deployment (After Testing)

### To Vercel (Easiest)
```bash
vercel
# Follow prompts
# Add environment variables in Vercel dashboard
```

### To Docker
```bash
docker build -t forumiq .
docker run -p 3000:3000 -e FORUS_API_KEY=... -e GEMINI_API_KEY=... forumiq
```

### To Self-Hosted Server
```bash
npm run build
npm start
```

## Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
# Or kill process on 3000
```

### API Key Errors
- Double-check `.env.local` is in project root
- Make sure quotes are removed from values
- Restart dev server after changing .env

### Gemini API Not Working
- Verify API key is valid
- Check Google Cloud Console for API enablement
- Ensure API has sufficient quota

## Next Steps

1. Read README.md for feature details
2. Check FEATURES.md for use cases
3. Review DEPLOYMENT.md for production setup
4. Explore the code - it's well commented!

## Need Help?

- Check DEPLOYMENT.md for detailed setup
- Review README.md for feature explanation
- Look at component code - well commented
- Try demo data mode first

---

**You're ready to go! Enjoy ForumIQ!**
