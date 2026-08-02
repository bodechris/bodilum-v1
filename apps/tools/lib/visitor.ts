import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const VISITOR_COOKIE_NAME = "bodilum_tools_visitor";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function getVisitorId(request: NextRequest) {
  const existing = request.cookies.get(VISITOR_COOKIE_NAME)?.value;
  if (existing && /^[0-9a-f-]{36}$/i.test(existing)) return existing;
  return randomUUID();
}

export function withVisitorCookie(response: NextResponse, id: string) {
  response.cookies.set(VISITOR_COOKIE_NAME, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return response;
}

export function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.nextUrl.host;
  } catch {
    return false;
  }
}
