import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import {
  deleteProspectFinderPreferences,
  getProspectFinderPreferences,
  saveProspectFinderPreferences,
} from "@/lib/user-profile";
import { firstValidationMessage, ProspectFinderPreferencesSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE_NAME = "bodilum_tools_visitor";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const MAX_REQUEST_BYTES = 36_000;

function visitorId(request: NextRequest) {
  const existing = request.cookies.get(COOKIE_NAME)?.value;
  if (existing && /^[0-9a-f-]{36}$/i.test(existing)) return existing;
  return randomUUID();
}

function attachVisitorCookie(response: NextResponse, id: string) {
  response.cookies.set(COOKIE_NAME, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return response;
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.nextUrl.host;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const id = visitorId(request);
  try {
    const preferences = await getProspectFinderPreferences(id);
    return attachVisitorCookie(
      NextResponse.json({ preferences, persistent: Boolean(env.mongoUri) }),
      id,
    );
  } catch (error) {
    console.error("Could not load saved prospect profile", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message.slice(0, 500) : "Unknown error",
    });
    return attachVisitorCookie(
      NextResponse.json({ preferences: null, persistent: false }),
      id,
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "The profile request origin is not allowed." }, { status: 403 });
  }
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "The saved profile is too large." }, { status: 413 });
  }

  const id = visitorId(request);
  try {
    const parsed = ProspectFinderPreferencesSchema.safeParse(await request.json());
    if (!parsed.success) {
      return attachVisitorCookie(
        NextResponse.json({ error: firstValidationMessage(parsed.error) }, { status: 400 }),
        id,
      );
    }
    const saved = await saveProspectFinderPreferences(id, parsed.data);
    if (!saved) {
      return attachVisitorCookie(
        NextResponse.json({ error: "Persistent profile storage is unavailable." }, { status: 503 }),
        id,
      );
    }
    return attachVisitorCookie(NextResponse.json({ saved: true }), id);
  } catch (error) {
    console.error("Could not save prospect profile", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message.slice(0, 500) : "Unknown error",
    });
    return attachVisitorCookie(
      NextResponse.json({ error: "Your profile could not be saved right now." }, { status: 503 }),
      id,
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "The profile request origin is not allowed." }, { status: 403 });
  }
  const id = visitorId(request);
  try {
    await deleteProspectFinderPreferences(id);
    const response = NextResponse.json({ deleted: true });
    response.cookies.delete(COOKIE_NAME);
    return response;
  } catch (error) {
    console.error("Could not delete prospect profile", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message.slice(0, 500) : "Unknown error",
    });
    return NextResponse.json({ error: "Your saved profile could not be deleted right now." }, { status: 503 });
  }
}
