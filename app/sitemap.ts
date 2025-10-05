import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const routes = ['', '/#services', '/#cases', '/#faq', '/#contacts'].map((path)=> ({
    url: `${base}/${path.replace(/^\//,'')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8
  }))
  return routes
}
