import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { POST } from '@/app/api/contact/route';
import { _resetRateLimitForTests } from '@/lib/rate-limit';

vi.mock('@/lib/email', () => ({
  sendEmail: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('@/lib/telegram', () => ({
  sendTelegram: vi.fn().mockResolvedValue(undefined),
  formatTelegramMessage: vi.fn(),
}));

const validBody = {
  name: 'Marta',
  email: 'marta@example.com',
  message: 'Vorrei lavorare sulla postura cronica.',
  consent: true,
  honeypot: '',
};

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '1.2.3.4', ...headers },
    body: JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => _resetRateLimitForTests());
  afterEach(() => vi.clearAllMocks());

  it('returns 200 ok on valid payload, both providers called', async () => {
    const { sendEmail } = await import('@/lib/email');
    const { sendTelegram } = await import('@/lib/telegram');
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(sendEmail).toHaveBeenCalledOnce();
    expect(sendTelegram).toHaveBeenCalledOnce();
  });

  it('returns 400 on validation fail', async () => {
    const res = await POST(makeRequest({ ...validBody, email: 'bad' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 (validation rejects) on honeypot non-empty and does NOT call providers', async () => {
    const { sendEmail } = await import('@/lib/email');
    const res = await POST(makeRequest({ ...validBody, honeypot: 'bot' }));
    expect(res.status).toBe(400);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it('returns 429 after exceeding rate limit', async () => {
    for (let i = 0; i < 3; i += 1) await POST(makeRequest(validBody));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(429);
  });

  it('returns 502 if both providers fail', async () => {
    const { sendEmail } = await import('@/lib/email');
    const { sendTelegram } = await import('@/lib/telegram');
    vi.mocked(sendEmail).mockRejectedValueOnce(new Error('email_failed'));
    vi.mocked(sendTelegram).mockRejectedValueOnce(new Error('telegram_failed'));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body.ok).toBe(false);
  });

  it('returns 200 if only one provider succeeds', async () => {
    const { sendEmail } = await import('@/lib/email');
    vi.mocked(sendEmail).mockRejectedValueOnce(new Error('email_failed'));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
  });
});
