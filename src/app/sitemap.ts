import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/shared/config/site';

const routes = ['/', '/about', '/skills', '/interests', '/goals', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, SITE_URL).href,
    changeFrequency: route === '/' ? 'monthly' : 'yearly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
