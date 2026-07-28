import type { Metadata } from 'next';

const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const SITE_URL = new URL(configuredUrl);

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
