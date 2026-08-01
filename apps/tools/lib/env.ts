export const env = {
  googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY ?? "",
  mongoUri: process.env.MONGODB_URI ?? "",
  mongoDb: process.env.MONGODB_DB ?? "bodilum_tools",
  awsRegion: process.env.AWS_REGION ?? "us-east-1",
  bedrockModelId: process.env.BEDROCK_MODEL_ID ?? "amazon.nova-lite-v1:0",
  rateLimitSalt: process.env.RATE_LIMIT_SALT ?? "change-me-in-production",
  demoMode: process.env.ENABLE_DEMO_MODE !== "false",
  searchDailyLimit: Number(process.env.SEARCH_DAILY_LIMIT ?? 10),
  analysisDailyLimit: Number(process.env.ANALYSIS_DAILY_LIMIT ?? 2),
};
