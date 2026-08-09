import type { Metadata } from 'next';

const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

if (process.env.NODE_ENV === 'production' && !configuredUrl) {
  throw new Error('NEXT_PUBLIC_SITE_URL production deploy uchun majburiy.');
}

export const SITE_URL = new URL(configuredUrl ?? 'http://localhost:3000');

if (process.env.NODE_ENV === 'production' && SITE_URL.protocol !== 'https:') {
  throw new Error('NEXT_PUBLIC_SITE_URL HTTPS manzil bo‘lishi kerak.');
}

interface PageMetadataOptions {
  title: string;
  description: string;
  path: `/${string}` | '/';
}

export const createPageMetadata = ({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: path,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
});
