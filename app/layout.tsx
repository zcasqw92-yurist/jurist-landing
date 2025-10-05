import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConsentBanner from '@/components/Consent'

const siteName = 'Юрист СПб — досудебные претензии, жалобы, иски'
const siteDescription =
  'Помогу вернуть деньги и защитить права: досудебные претензии, жалобы в госорганы, исковые заявления. Работаю по СПб и Ленобласти. Быстро, по закону, без лишних нервов.'
const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: '%s — Юрист СПб',
  },
  description: siteDescription,
  openGraph: {
    type: 'website',
    siteName,
    title: siteName,
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
    url: siteUrl,
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: { index: true, follow: true },
  applicationName: 'Юрист СПб',
  authors: [{ name: 'Юрист СПб' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  )
}
