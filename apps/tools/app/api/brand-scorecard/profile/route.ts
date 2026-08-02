import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { brandScorecardQuestionIds } from "@/lib/brand-scorecard";
import {
  blankBrandScorecardState,
  deleteBrandScorecardState,
  getBrandScorecardState,
  saveBrandScorecardState,
} from "@/lib/brand-scorecard-storage";
import { BrandScorecardDraftSchema, firstValidationMessage } from "@/lib/validation";
import { getVisitorId, isSameOrigin, VISITOR_COOKIE_NAME, withVisitorCookie } from "@/lib/visitor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const MAX_REQUEST_BYTES = 55_000;

export async function GET(request: NextRequest) {
  const id = getVisitorId(request);
  try {
    const state = (await getBrandScorecardState(id)) ?? blankBrandScorecardState();
    return withVisitorCookie(
      NextResponse.json({ state, persistent: Boolean(env.mongoUri) }),
      id,
    );
  } catch (error) {
    console.error("Could not load brand scorecard state", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message.slice(0, 500) : "Unknown error",
    });
    return withVisitorCookie(
      NextResponse.json({ state: blankBrandScorecardState(), persistent: false }),
      id,
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "The scorecard request origin is not allowed." }, { status: 403 });
  }
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "The saved scorecard is too large." }, { status: 413 });
  }
  const id = getVisitorId(request);
  try {
    const parsed = BrandScorecardDraftSchema.safeParse(await request.json());
    if (!parsed.success) {
      return withVisitorCookie(
        NextResponse.json({ error: firstValidationMessage(parsed.error) }, { status: 400 }),
        id,
      );
    }
    const allowedIds = new Set(brandScorecardQuestionIds);
    const answers = Object.fromEntries(
      Object.entries(parsed.data.answers).filter(([questionId]) => allowedIds.has(questionId)),
    );
    const saved = await saveBrandScorecardState(
      id,
      { profile: parsed.data.profile, answers, currentStep: parsed.data.currentStep },
      parsed.data.clearResult,
    );
    if (!saved) {
      return withVisitorCookie(
        NextResponse.json({ error: "Persistent scorecard storage is unavailable." }, { status: 503 }),
        id,
      );
    }
    return withVisitorCookie(NextResponse.json({ saved: true }), id);
  } catch (error) {
    console.error("Could not save brand scorecard state", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message.slice(0, 500) : "Unknown error",
    });
    return withVisitorCookie(
      NextResponse.json({ error: "Your scorecard could not be saved right now." }, { status: 503 }),
      id,
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "The scorecard request origin is not allowed." }, { status: 403 });
  }
  const id = getVisitorId(request);
  try {
    await deleteBrandScorecardState(id);
    const response = NextResponse.json({ deleted: true });
    response.cookies.delete(VISITOR_COOKIE_NAME);
    return response;
  } catch (error) {
    console.error("Could not delete brand scorecard state", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message.slice(0, 500) : "Unknown error",
    });
    return NextResponse.json({ error: "Your saved scorecard could not be deleted right now." }, { status: 503 });
  }
}
