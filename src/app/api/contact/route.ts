export const runtime = 'nodejs';

const MAX_NAME_LENGTH = 100;
const MAX_CONTACT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2_000;
const MAX_BODY_SIZE = 8_192;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1_000;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

const readText = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const isRateLimited = (request: Request) => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip');

  if (!ip) return false;

  const now = Date.now();
  const current = requestCounts.get(ip);

  if (!current || current.resetAt <= now) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT;
};

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return Response.json(
      { error: 'Juda ko‘p so‘rov yuborildi. Keyinroq urinib ko‘ring.' },
      { status: 429 },
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
