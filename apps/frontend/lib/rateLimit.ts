type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type RateLimitBucket = {
  count: number;
  expires: number;
};

const buckets = new Map<string, RateLimitBucket>();

export function rateLimit(key: string, { limit, windowMs }: RateLimitOptions): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.expires) {
    buckets.set(key, { count: 1, expires: now + windowMs });
    return true;
  }

  if (bucket.count < limit) {
    bucket.count += 1;
    return true;
  }

  return false;
}