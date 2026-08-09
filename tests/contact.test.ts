import { beforeEach, describe, expect, it, vi } from 'vitest';

const rateLimit = vi.hoisted(() => ({
  enforceContactRateLimit: vi.fn(),
}));

vi.mock('@/shared/lib/contact-rate-limit', () => rateLimit);

import { POST } from '@/app/api/contact/route';
import { isValidContact } from '@/shared/lib/contact';

const createRequest = (body: unknown, origin = 'http://localhost:3000') =>
  new Request('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify(body),
  });

describe('contact validation', () => {
  it('accepts valid email and Telegram username values', () => {
    expect(isValidContact('hello@example.com')).toBe(true);
    expect(isValidContact('@abdulaziz_dev')).toBe(true);
  });

  it('rejects malformed contact values', () => {
    expect(isValidContact('hello-at-example')).toBe(false);
    expect(isValidContact('@bad')).toBe(false);
  });
});

describe('POST /api/contact', () => {
  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = 'token';
    process.env.TELEGRAM_CHAT_ID = 'chat-id';
    rateLimit.enforceContactRateLimit.mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      reset: Date.now() + 600_000,
    });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 200 })));
  });

  it('rejects a request from another origin', async () => {
    const response = await POST(createRequest({}, 'https://malicious.example'));

    expect(response.status).toBe(403);
  });

  it('rejects an invalid contact address', async () => {
    const response = await POST(
      createRequest({ name: 'Ali', contact: 'not-an-address', message: 'Salom' }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'Email yoki Telegram manzili noto‘g‘ri.' });
  });

  it('returns Retry-After when the rate limit is exceeded', async () => {
    rateLimit.enforceContactRateLimit.mockResolvedValue({
      success: false,
      limit: 5,
      remaining: 0,
      reset: Date.now() + 60_000,
    });

    const response = await POST(createRequest({ name: 'Ali', message: 'Salom' }));

    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBeTruthy();
  });

  it('sends a valid request to Telegram', async () => {
    const response = await POST(
      createRequest({ name: 'Ali', contact: '@ali_dev', message: 'Hamkorlik qilamizmi?' }),
    );

    expect(response.status).toBe(200);
    expect(fetch).toHaveBeenCalledOnce();
  });
});
