export const runtime = 'nodejs';

import { SITE_URL } from '@/shared/config/site';
import {
  MAX_BODY_SIZE,
  MAX_CONTACT_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  isValidContact,
  readText,
} from '@/shared/lib/contact';
import { enforceContactRateLimit } from '@/shared/lib/contact-rate-limit';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== SITE_URL.origin) {
    return Response.json({ error: 'Noto‘g‘ri so‘rov manbasi.' }, { status: 403 });
  }

  let rateLimit;

  try {
    rateLimit = await enforceContactRateLimit(request);
  } catch {
    return Response.json(
      { error: 'Xabar xizmati vaqtincha ishlamayapti. Keyinroq urinib ko‘ring.' },
      { status: 503 },
    );
  }

  if (!rateLimit.success) {
    const retryAfter = Math.max(1, Math.ceil((rateLimit.reset - Date.now()) / 1_000));
    return Response.json(
      { error: 'Juda ko‘p so‘rov yuborildi. Keyinroq urinib ko‘ring.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(rateLimit.limit),
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        },
      },
    );
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return Response.json({ error: 'Noto‘g‘ri so‘rov turi.' }, { status: 415 });
  }

  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_SIZE) {
    return Response.json({ error: 'So‘rov hajmi juda katta.' }, { status: 413 });
  }

  let body: unknown;

  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_SIZE) {
      return Response.json({ error: 'So‘rov hajmi juda katta.' }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: 'Noto‘g‘ri so‘rov yuborildi.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return Response.json({ error: 'Noto‘g‘ri so‘rov yuborildi.' }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = readText(data.name);
  const contact = readText(data.contact);
  const message = readText(data.message);
  const website = readText(data.website);

  if (website) {
    return Response.json({ success: true });
  }

  if (!name || !message) {
    return Response.json(
      { error: 'Ism va xabar maydonlari majburiy.' },
      { status: 400 },
    );
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    contact.length > MAX_CONTACT_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return Response.json({ error: 'Maydonlardan biri ruxsat etilgan hajmdan uzun.' }, { status: 400 });
  }

  if (!isValidContact(contact)) {
    return Response.json({ error: 'Email yoki Telegram manzili noto‘g‘ri.' }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return Response.json(
      { error: 'Xabar xizmati hali sozlanmagan.' },
      { status: 503 },
    );
  }

  const telegramMessage = [
    'Yangi hamkorlik taklifi',
    '',
    `Ism: ${name}`,
    `Aloqa: ${contact || 'Ko‘rsatilmagan'}`,
    '',
    'Xabar:',
    message,
  ].join('\n');

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: telegramMessage }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      return Response.json(
        { error: 'Xabarni yuborib bo‘lmadi. Keyinroq urinib ko‘ring.' },
        { status: 502 },
      );
    }
  } catch {
    return Response.json(
      { error: 'Xabarni yuborib bo‘lmadi. Keyinroq urinib ko‘ring.' },
      { status: 502 },
    );
  }

  return Response.json({ success: true });
}
