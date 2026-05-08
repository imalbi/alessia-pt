const STORE = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 10 * 60 * 1000; // 10 min
const MAX_REQUESTS = 3;

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSec?: number;
}

export function checkRateLimit(key: string, now = Date.now()): RateLimitResult {
  const entry = STORE.get(key);
  if (!entry || entry.resetAt < now) {
    STORE.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_REQUESTS - 1 };
  }
  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, remaining: 0, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true, remaining: MAX_REQUESTS - entry.count };
}

export function _resetRateLimitForTests() {
  STORE.clear();
}
