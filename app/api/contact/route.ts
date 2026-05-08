import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation/contact';
import { sendEmail } from '@/lib/email';
import { sendTelegram } from '@/lib/telegram';
import { checkRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

function getIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation', issues: parsed.error.issues.map((i) => i.message) },
      { status: 400 },
    );
  }

  const ip = getIp(req);
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited', retryAfter: rl.retryAfterSec },
      { status: 429, headers: { 'retry-after': String(rl.retryAfterSec ?? 60) } },
    );
  }

  const results = await Promise.allSettled([sendEmail(parsed.data), sendTelegram(parsed.data)]);

  const allFailed = results.every((r) => r.status === 'rejected');
  if (allFailed) {
    return NextResponse.json({ ok: false, retryable: true }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
