import crypto from "node:crypto";
import type { Collection, Db } from "mongodb";
import { getDatabase } from "@/lib/mongodb";
import { env } from "@/lib/env";

const memoryUsage = new Map<string, { count: number; expiresAt: number }>();
let indexPromise: Promise<string> | null = null;

export type RateLimitResult = { allowed: boolean; limit: number; remaining: number; resetAt: string };
type UsageDocument = { _id: string; count: number; action: "search" | "analysis" | "scorecard"; createdAt: Date; expiresAt: Date };

export class RateLimitUnavailableError extends Error {
  constructor() {
    super("Reliable rate limiting is not configured. Add MONGODB_URI before enabling public access.");
    this.name = "RateLimitUnavailableError";
  }
}

function dayWindow() {
  const now = new Date();
  const reset = new Date(now);
  reset.setUTCHours(24, 0, 0, 0);
  return { dateKey: now.toISOString().slice(0, 10), reset };
}

function hashIdentity(identity: string) {
  const salt = env.rateLimitSalt || "local-development-only";
  return crypto.createHash("sha256").update(`${salt}:${identity}`).digest("hex");
}

export function getRequestIdentity(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const vercelIp = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  return hashIdentity(`${vercelIp ?? forwarded ?? realIp ?? "unknown"}:${userAgent}`);
}

async function usageCollection(db: Db): Promise<Collection<UsageDocument>> {
  const collection = db.collection<UsageDocument>("usage_counters");
  const pendingIndex = indexPromise ?? collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  indexPromise = pendingIndex;
  await pendingIndex.catch(() => undefined);
  return collection;
}

function consumeMemory(key: string, limit: number, reset: Date): RateLimitResult {
  const current = memoryUsage.get(key);
  if (!current || current.expiresAt <= Date.now()) {
    memoryUsage.set(key, { count: 1, expiresAt: reset.getTime() });
    return { allowed: true, limit, remaining: Math.max(0, limit - 1), resetAt: reset.toISOString() };
  }
  if (current.count >= limit) return { allowed: false, limit, remaining: 0, resetAt: reset.toISOString() };
  current.count += 1;
  memoryUsage.set(key, current);
  return { allowed: true, limit, remaining: Math.max(0, limit - current.count), resetAt: reset.toISOString() };
}

export async function consumeDailyLimit(identity: string, action: "search" | "analysis" | "scorecard", limit: number): Promise<RateLimitResult> {
  const { dateKey, reset } = dayWindow();
  const key = `${action}:${identity}:${dateKey}`;
  const db = await getDatabase().catch(() => null);
  if (!db) {
    if (env.requireRateLimitDatabase) throw new RateLimitUnavailableError();
    return consumeMemory(key, limit, reset);
  }
  const collection = await usageCollection(db);
  try {
    const result = await collection.findOneAndUpdate(
      { _id: key, count: { $lt: limit } },
      { $inc: { count: 1 }, $setOnInsert: { action, createdAt: new Date(), expiresAt: reset } },
      { upsert: true, returnDocument: "after" },
    );
    const count = Number(result?.count ?? 1);
    return { allowed: count <= limit, limit, remaining: Math.max(0, limit - count), resetAt: reset.toISOString() };
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? Number(error.code) : 0;
    if (code == 11000) return { allowed: false, limit, remaining: 0, resetAt: reset.toISOString() };
    throw error;
  }
}

export async function refundDailyLimit(identity: string, action: "search" | "analysis" | "scorecard") {
  const { dateKey } = dayWindow();
  const key = `${action}:${identity}:${dateKey}`;
  const db = await getDatabase().catch(() => null);
  if (!db) {
    const current = memoryUsage.get(key);
    if (!current) return;
    current.count = Math.max(0, current.count - 1);
    memoryUsage.set(key, current);
    return;
  }
  const collection = await usageCollection(db);
  await collection.updateOne({ _id: key, count: { $gt: 0 } }, { $inc: { count: -1 } });
}
