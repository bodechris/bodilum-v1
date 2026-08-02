# Bodilum Business Tools — production-ready Prospect Finder

Next.js application for `tools.bodilum.com` containing the tools homepage and an AI-assisted local Prospect Finder.

## What is included

- Google Places API (New) business discovery with low-cost search field masks
- Place Details enrichment only after a user selects a prospect
- Public website analysis with robots.txt handling, response-size limits, redirect checks and SSRF protections
- Amazon Nova 2 Lite analysis through Amazon Bedrock
- Vercel OIDC authentication to AWS; no permanent AWS keys are required in Vercel
- Zod validation for requests and model output, with one controlled JSON repair attempt
- MongoDB-backed daily rate limits with atomic reservations and automatic expiry
- Per-browser Prospect Finder profiles saved pseudonymously in MongoDB, with local-storage fallback and a clear/delete control
- Branded client-side PDF downloads
- Privacy, Terms and Acceptable Use pages
- Health/config endpoint at `/api/health`
- Kill switches and basic security headers

## Install and run

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Required Vercel production variables

```env
NEXT_PUBLIC_SITE_URL=https://tools.bodilum.com
GOOGLE_PLACES_API_KEY=...
MONGODB_URI=...
MONGODB_DB=bodilum_tools
RATE_LIMIT_SALT=use-a-random-secret-at-least-24-characters
RATE_LIMIT_REQUIRE_DATABASE=true
SEARCH_DAILY_LIMIT=10
ANALYSIS_DAILY_LIMIT=2
PROSPECT_SEARCH_ENABLED=true
PROSPECT_ANALYSIS_ENABLED=true
AWS_REGION=eu-west-1
AWS_ROLE_ARN=arn:aws:iam::338193218732:role/BodilumProspectFinderBedrockProdRole
BEDROCK_MODEL_ID=eu.amazon.nova-2-lite-v1:0
BEDROCK_TIMEOUT_MS=70000
ENABLE_DEMO_MODE=false
```

Do not add `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` to Vercel. The application uses `@vercel/oidc-aws-credentials-provider` and the production IAM role you configured.

## Vercel setup

- Framework: Next.js
- Root directory: the folder containing this `package.json` (or `apps/tools` in your monorepo)
- Build command: `pnpm build`
- Install command: `pnpm install`
- Node.js: 22
- Custom domain: `tools.bodilum.com`

After changing environment variables, redeploy production. Visit `/api/health`; production is ready when it returns `200` with `status: "ok"`.

## Google Places controls

The Google key must remain server-side and be restricted to Places API (New). Set Google Cloud quotas and billing alerts. Search requests only retrieve lightweight listing fields. Rating, review count, website, telephone and opening hours are requested only during a selected prospect analysis.

## MongoDB

Production defaults to fail closed when MongoDB is absent because in-memory limits are unreliable across Vercel instances. Use an Atlas database and allow Vercel connectivity. The app creates a TTL index on `usage_counters.expiresAt` automatically and a unique owner index for `prospect_finder_profiles`. Business details, outreach contact details and the last target market are stored against a hashed anonymous browser identifier; no IP address is stored in the profile document.

## AWS Bedrock

The code expects:

- Region: `eu-west-1`
- Model/inference profile: `eu.amazon.nova-2-lite-v1:0`
- Role: `BodilumProspectFinderBedrockProdRole`
- Vercel Team OIDC issuer and a trust policy restricted to `bodilum-v1-tools` production

The report explicitly shows whether it was AI-assisted or produced by the conservative rules-based fallback.

## Launch checks

1. `pnpm check-types`
2. `pnpm lint`
3. `pnpm build`
4. `/api/health` returns 200 in production
5. Search for a real business
6. Analyse a business with a public website
7. Confirm `AI-assisted` appears on the report
8. Confirm the IAM role shows recent activity
9. Download and open the PDF
10. Test the daily limit and a failed request

## Security note

The uploaded development archive contained a `.env.local` file with long-lived AWS credential fields. This production package excludes that file. Remove those old fields locally and deactivate any IAM access key that was created only for this project now that OIDC is in place.

## Bedrock relevance and fallback behaviour

A valid Amazon Bedrock response is now kept as AI-assisted even when one or more sections fail the offer-relevance checks. The application makes one repair request, then applies deterministic offer-specific safeguards to the affected strategy and outreach sections instead of discarding the whole AI analysis. The rules-based fallback is now reserved for an actual Bedrock invocation failure or a response that cannot be parsed after the repair attempt.

Public email discovery also filters telemetry, Sentry/Wix error addresses, machine-generated identifiers and malformed addresses that do not match the prospect's official website domain.

## Brand Scorecard

The Brand Scorecard is available at `/brand-scorecard` and includes:

- 40 questions across brand foundation, visual identity, digital credibility, customer experience and growth/AI readiness;
- direct scoring out of 100 with transparent category scores;
- optional Amazon Bedrock enrichment for an industry-specific diagnosis;
- deterministic fallback recommendations when Bedrock is unavailable;
- a 30-day action plan and downloadable PDF;
- browser-specific profile, draft and result storage in MongoDB;
- a configurable daily completion limit.

Production variables:

```env
BRAND_SCORECARD_ENABLED=true
SCORECARD_DAILY_LIMIT=3
```

Completed assessments are stored in:

- `brand_scorecard_profiles`
- `brand_scorecard_results`

The score itself is always calculated directly from the 40 answers. Amazon Bedrock only enriches the narrative and does not alter the numeric score.
