// lib/site.ts

export function getSiteBaseUrl() {
  let url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // убираем лишние / в конце (иначе могут быть // в sitemap)
  url = url.replace(/\/+$/, '')

  // если по ошибке указали без https:// — добавляем
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`
  }

  return url
}
