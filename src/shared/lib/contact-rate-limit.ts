import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const RATE_LIMIT = 5;
const RATE_WINDOW = '10 m';
const RATE_WINDOW_MS = 10 * 60 * 1_000;

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const rateLimit =
  redisUrl && redisToken
    ? new Ratelimit({
        redis: new Redis({ url: redisUrl, token: redisToken }),
        limiter: Ratelimit.slidingWindow(RATE_LIMIT, RATE_WINDOW),
        prefix: 'abdulaziz-portfolio:contact',
      })
    : null;

const localRequests = new Map<string, number[]>();

export class ContactRateLimitUnavailableError extends Error {
  constructor() {
    super('Contact rate limit is not configured.');
  }
}

export const getContactRateLimitIdentifier = (request: Request) => {
  const ip =
    request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip')?.trim();

  return ip ? `ip:${ip}` : 'anonymous';
};

export const enforceContactRateLimit = async (request: Request) => {
  if (rateLimit) return rateLimit.limit(getContactRateLimitIdentifier(request));

  if (process.env.NODE_ENV === 'production') throw new ContactRateLimitUnavailableError();

  const identifier = getContactRateLimitIdentifier(request);
  const now = Date.now();
  const requests = (localRequests.get(identifier) ?? []).filter(
    (timestamp) => timestamp > now - RATE_WINDOW_MS,
  );

  requests.push(now);
  localRequests.set(identifier, requests);

  return {
    success: requests.length <= RATE_LIMIT,
    limit: RATE_LIMIT,
    remaining: Math.max(0, RATE_LIMIT - requests.length),
    reset: requests[0] + RATE_WINDOW_MS,
  };
};
