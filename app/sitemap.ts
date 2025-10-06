import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL!;
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/uslugi/dosudebnaya-pretenziya`, priority: 0.9 },
    { url: `${base}/uslugi/pretenziya-v-rospotrebnadzor`, priority: 0.8 },
  ];
}

