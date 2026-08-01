# Bodilum Business Tools

A Next.js application for `tools.bodilum.com` with:

- Business tools home page
- Links to the existing BiznesXpo business-name and brand-colour tools
- Bodilum Prospect Finder
- Google Places business discovery
- Public website analysis with SSRF protection and robots.txt support
- Amazon Bedrock prospect scoring and outreach generation
- Rules-based fallback reports when Bedrock is not configured
- MongoDB-backed daily rate limits with a local in-memory fallback
- Client-side branded PDF downloads

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3010`.

## Vercel environment variables

Add these in **Vercel → Project → Settings → Environment Variables**:

### Required for live Google results

- `GOOGLE_PLACES_API_KEY`

Create a billing-enabled Google Cloud project, enable **Places API (New)** and restrict the key to the Places API. The key is used only in server route handlers and is not exposed to the browser.

### Recommended for reliable rate limiting

- `MONGODB_URI`
- `MONGODB_DB=bodilum_tools`
- `RATE_LIMIT_SALT`
- `SEARCH_DAILY_LIMIT=10`
- `ANALYSIS_DAILY_LIMIT=2`

Without MongoDB, the app uses an in-memory fallback. That is fine for a local demo but is not reliable across Vercel serverless instances.

### Amazon Bedrock

- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `BEDROCK_MODEL_ID`

The default model ID is `amazon.nova-lite-v1:0`. Confirm that the selected model is available in your chosen AWS region. If Bedrock is unavailable, the tool still produces a useful rules-based report and clearly identifies it as a fallback.

### Preview/demo mode

- `ENABLE_DEMO_MODE=true`

When a Google Places key is missing, the UI returns clearly labelled demo businesses so the design and complete report flow can still be tested. Set this to `false` in production after configuring Google Places.

## Vercel deployment

1. Push this project to GitHub or import the folder directly into Vercel.
2. Set the framework preset to **Next.js**.
3. Add the environment variables above.
4. Add the custom domain `tools.bodilum.com`.
5. Point the Bodilum DNS record to Vercel as instructed.

The app does not require GitHub Actions. Vercel can build directly from the repository.

## Google Places cost controls

The search route requests only lightweight fields. Full website, rating, telephone and opening-hours details are fetched only when a user clicks **Analyse prospect**. The default app limits are 10 searches and 2 full analyses per browser/IP identity per day.

Set daily quotas in Google Cloud as an additional safety ceiling.

## Current MVP constraint

Analysis runs synchronously in a Vercel route handler. This is suitable for an early controlled launch. If usage grows or some sites regularly exceed the function duration, move website crawling and Bedrock generation into an SQS/Lambda worker while keeping the current UI and API contract.
