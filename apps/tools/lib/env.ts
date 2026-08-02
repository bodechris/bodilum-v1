function positiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

function booleanValue(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;
  return value.toLowerCase() === "true";
}

const isProduction = process.env.NODE_ENV === "production";

export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tools.bodilum.com",
  googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY ?? "",
  mongoUri: process.env.MONGODB_URI ?? "",
  mongoDb: process.env.MONGODB_DB ?? "bodilum_tools",
  awsRegion: process.env.AWS_REGION ?? "eu-west-1",
  awsRoleArn: process.env.AWS_ROLE_ARN ?? "",
  bedrockModelId: process.env.BEDROCK_MODEL_ID ?? "",
  bedrockTimeoutMs: positiveInteger(process.env.BEDROCK_TIMEOUT_MS, 70_000),
  rateLimitSalt: process.env.RATE_LIMIT_SALT ?? "",
  requireRateLimitDatabase: booleanValue(process.env.RATE_LIMIT_REQUIRE_DATABASE, isProduction),
  demoMode: booleanValue(process.env.ENABLE_DEMO_MODE, !isProduction),
  prospectSearchEnabled: booleanValue(process.env.PROSPECT_SEARCH_ENABLED, true),
  prospectAnalysisEnabled: booleanValue(process.env.PROSPECT_ANALYSIS_ENABLED, true),
  searchDailyLimit: positiveInteger(process.env.SEARCH_DAILY_LIMIT, 10),
  analysisDailyLimit: positiveInteger(process.env.ANALYSIS_DAILY_LIMIT, 2),
};

export function bedrockConfigured() {
  const hasCredentialSource = Boolean(
    env.awsRoleArn ||
      process.env.AWS_ACCESS_KEY_ID ||
      process.env.AWS_PROFILE ||
      process.env.AWS_WEB_IDENTITY_TOKEN_FILE,
  );
  return Boolean(env.awsRegion && env.bedrockModelId && hasCredentialSource);
}

export function productionConfigurationIssues() {
  if (!isProduction) return [];
  const issues: string[] = [];
  if (!env.googlePlacesApiKey) issues.push("GOOGLE_PLACES_API_KEY is missing");
  if (!env.mongoUri && env.requireRateLimitDatabase) issues.push("MONGODB_URI is missing");
  if (!env.rateLimitSalt || env.rateLimitSalt.length < 24) issues.push("RATE_LIMIT_SALT must be at least 24 characters");
  if (!bedrockConfigured()) issues.push("Amazon Bedrock is not fully configured");
  if (env.demoMode) issues.push("ENABLE_DEMO_MODE must be false in production");
  return issues;
}
