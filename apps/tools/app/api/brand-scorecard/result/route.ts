import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { calculateBrandScorecard, brandScorecardQuestionIds } from "@/lib/brand-scorecard";
import { enrichBrandScorecard } from "@/lib/brand-scorecard-ai";
import { saveBrandScorecardResult } from "@/lib/brand-scorecard-storage";
import { env } from "@/lib/env";
import {
  consumeDailyLimit,
  getRequestIdentity,
  RateLimitUnavailableError,
  refundDailyLimit,
} from "@/lib/rate-limit";
import { BrandScorecardResultRequestSchema, firstValidationMessage } from "@/lib/validation";
import { getVisitorId, isSameOrigin, withVisitorCookie } from "@/lib/visitor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;
const MAX_REQUEST_BYTES = 55_000;

export async function POST(request: NextRequest) {
  let identity = "";
  let reserved = false;
  const visitorId = getVisitorId(request);
  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json({ error: "The scorecard request origin is not allowed." }, { status: 403 });
    }
    if (!env.brandScorecardEnabled) {
      return NextResponse.json({ error: "The Brand Scorecard is temporarily unavailable." }, { status: 503 });
    }
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: "The scorecard request is too large." }, { status: 413 });
    }
    const parsed = BrandScorecardResultRequestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return withVisitorCookie(
        NextResponse.json({ error: firstValidationMessage(parsed.error) }, { status: 400 }),
        visitorId,
      );
    }
    const missing = brandScorecardQuestionIds.filter((id) => !parsed.data.answers[id]);
    if (missing.length) {
      return withVisitorCookie(
        NextResponse.json({ error: `Answer all 40 questions before generating your score. ${missing.length} remaining.` }, { status: 400 }),
        visitorId,
      );
    }

    identity = getRequestIdentity(request);
    const rateLimit = await consumeDailyLimit(identity, "scorecard", env.scorecardDailyLimit);
    if (!rateLimit.allowed) {
      return withVisitorCookie(
        NextResponse.json({ error: "You have reached today's free Brand Scorecard limit.", rateLimit }, { status: 429 }),
        visitorId,
      );
    }
    reserved = true;

    const answers = Object.fromEntries(
      brandScorecardQuestionIds.map((questionId) => [questionId, parsed.data.answers[questionId]]),
    );
    const deterministic = calculateBrandScorecard(parsed.data.profile, answers, randomUUID());
    const result = await enrichBrandScorecard(deterministic);
    await saveBrandScorecardResult(visitorId, result).catch((error) => {
      console.error("Could not persist completed Brand Scorecard", {
        name: error instanceof Error ? error.name : "UnknownError",
        message: error instanceof Error ? error.message.slice(0, 500) : "Unknown error",
      });
    });

    return withVisitorCookie(NextResponse.json({ result, rateLimit }), visitorId);
  } catch (error) {
    if (reserved && identity) await refundDailyLimit(identity, "scorecard").catch(() => undefined);
    console.error("Brand Scorecard request failed", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message.slice(0, 700) : "Unknown error",
    });
    if (error instanceof RateLimitUnavailableError) {
      return withVisitorCookie(NextResponse.json({ error: error.message }, { status: 503 }), visitorId);
    }
    return withVisitorCookie(
      NextResponse.json({ error: "Unable to generate your Brand Scorecard right now. Please try again shortly." }, { status: 502 }),
      visitorId,
    );
  }
}
