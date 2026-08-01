import crypto from "node:crypto";
import { getDatabase } from "@/lib/mongodb";
import { env } from "@/lib/env";

const memoryUsage = new Map<string, { count: number; expiresAt: number }>();

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: string;
};

function dayWindow() {
  const now = new Date();
  const reset = new Date(now);
  reset.setUTCHours(24, 0, 0, 0);
  return {
    dateKey: now.toISOString().slice(0, 10),
    reset,
  };
}

function hashIdentity(identity: string) {
  return crypto
    .createHash("sha256")
    .update(`${env.rateLimitSalt}:${identity}`)
    .digest("hex");
}

export function getRequestIdentity(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  return hashIdentity(`${forwarded ?? realIp ?? "unknown"}:${userAgent}`);
}

export async function consumeDailyLimit(
  identity: string,
  action: "search" | "analysis",
  limit: number,
): Promise<RateLimitResult> {
  const { dateKey, reset } = dayWindow();
  const key = `${action}:${identity}:${dateKey}`;
  const db = await getDatabase().catch(() => null);

  if (!db) {
    const current = memoryUsage.get(key);
    if (!current || current.expiresAt <= Date.now()) {
      memoryUsage.set(key, { count: 1, expiresAt: reset.getTime() });
      return {
        allowed: true,
        limit,
        remaining: Math.max(0, limit - 1),
        resetAt: reset.toISOString(),
      };
    }

    if (current.count >= limit) {
      return { allowed: false, limit, remaining: 0, resetAt: reset.toISOString() };
    }

    current.count += 1;
    memoryUsage.set(key, current);
    return {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - current.count),
      resetAt: reset.toISOString(),
    };
  }

  type UsageDocument = {
    _id: string;
    count: number;
    action: "search" | "analysis";
    createdAt: Date;
    expiresAt: Date;
  };
  const collection = db.collection<UsageDocument>("usage_counters");
  void collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }).catch(() => undefined);
  const existing = await collection.findOne({ _id: key });

  if (existing && existing.count >= limit) {
    return { allowed: false, limit, remaining: 0, resetAt: reset.toISOString() };
  }

  const result = await collection.findOneAndUpdate(
    { _id: key },
    {
      $inc: { count: 1 },
      $setOnInsert: {
        action,
        createdAt: new Date(),
        expiresAt: reset,
      },
    },
    { upsert: true, returnDocument: "after" },
  );

  const count = Number(result?.count ?? 1);
  return {
    allowed: count <= limit,
    limit,
    remaining: Math.max(0, limit - count),
    resetAt: reset.toISOString(),
  };
}
