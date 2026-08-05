import { NextResponse } from "next/server";
import {
  bedrockConfigured,
  env,
  openAiConfigured,
  productionConfigurationIssues,
  prospectAiConfigured,
} from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const issues = productionConfigurationIssues();
  const ready = issues.length === 0;

  return NextResponse.json({
    status: ready ? "ok" : "degraded",
    services: {
      googlePlaces: Boolean(env.googlePlacesApiKey),
      persistentRateLimit: Boolean(env.mongoUri),
      profileStorage: Boolean(env.mongoUri),
      prospectAi: prospectAiConfigured(),
      bedrock: bedrockConfigured(),
      openai: openAiConfigured(),
      searchEnabled: env.prospectSearchEnabled,
      analysisEnabled: env.prospectAnalysisEnabled,
      brandScorecardEnabled: env.brandScorecardEnabled,
      demoMode: env.demoMode,
    },
    ...(process.env.NODE_ENV !== "production" ? { issues } : {}),
  }, { status: ready ? 200 : 503 });
}
