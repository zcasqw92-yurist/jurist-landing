import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConsentBanner from '@/components/Consent'

const siteName = 'Юрист СПб — досудебные претензии, жалобы, иски'
const siteDescription = 'Помогу вернуть деньги и защитить права: досудебные претензии, жалобы в госорганы, исковые заявления. Работаю по СПб и Ленобласти. Быстро, по закону, без лишних нервов.'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

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
    images: ['/og-image.png'],
    url: siteUrl,
    locale: 'ru_RU'
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: { index: true, follow: true },
  applicationName: 'Юрист СПб',
  authors: [{ name: 'Юрист СПб' }],
  verification: {
    // place for yandex/google site verification meta via env if needed
  }
}

export default function RootLayout({children}:{children: React.ReactNode}){
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  )
}
