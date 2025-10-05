import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const host = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const now = new Date().toISOString();
  return [
    { url: `${host}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${host}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${host}/offer`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${host}/contacts`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 }
  ];
}
