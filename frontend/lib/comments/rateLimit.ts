type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const MAX_HITS: number = Number(process.env.COMMENTS_RATE_LIMIT ?? 5);
const WINDOW_MS: number = Number(process.env.COMMENTS_RATE_LIMIT_WINDOW_MS ?? 60_000);
const MAX_BUCKETS = 10_000;

export function rateLimit(key: string): {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
} {
  const now = Date.now();

  if (buckets.size > MAX_BUCKETS) {
    for (const [k, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(k);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_HITS - 1, retryAfterSeconds: 0 };
  }

  bucket.count += 1;
  if (bucket.count > MAX_HITS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }
  return { allowed: true, remaining: MAX_HITS - bucket.count, retryAfterSeconds: 0 };
}

export function clientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
