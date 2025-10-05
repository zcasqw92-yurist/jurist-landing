import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Юридическая помощь — досудебные претензии и возврат денег',
    template: '%s — Юрпомощь'
  },
  description: 'Помогаю вернуть деньги без суда: досудебные претензии, жалобы, пошаговые инструкции. Быстро, по закону, по делу.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Юридическая помощь — претензии и возвраты',
    description: 'Верну деньги, составлю претензию, объясню шаги. Работаю по РФ.',
    images: ['/og.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Юридическая помощь — претензии',
    description: 'Досудебные претензии и возврат денег.',
    images: ['/og.png']
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Юридическая помощь — претензии и возврат денег",
    "url": SITE_URL,
    "areaServed": "RU",
    "serviceType": "Досудебные претензии, жалобы, иски",
    "priceRange": "₽₽"
  };

  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-dvh">
        {children}
      </body>
    </html>
  );
}
