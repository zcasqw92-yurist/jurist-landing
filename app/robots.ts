import type { MetadataRoute } from 'next'
import { getSiteBaseUrl } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  const base = getSiteBaseUrl()
  const isProd = process.env.VERCEL_ENV === 'production'

  if (!isProd) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      sitemap: `${base}/sitemap.xml`,
      host: base,
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin', '/admin/', '/admin/*'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}

