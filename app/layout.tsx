import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const SITE_NAME = 'Юрист-Премиум';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Досудебные претензии без суда — СПб и РФ',
    template: '%s — ' + SITE_NAME,
  },
  description:
    'Помогаем вернуть деньги без суда. Сильные досудебные претензии за 1 день. Бесплатный разбор случая.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'ru_RU',
    title: 'Досудебные претензии — вернуть деньги без суда',
    description:
      'Юрист онлайн. Подготовим претензию под ключ, поможем решить спор без суда.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Досудебные претензии — вернуть деньги без суда',
    description:
      'Быстрый разбор, сильный документ, пошаговые инструкции до результата.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Organization'],
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    areaServed: 'RU',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Санкт-Петербург',
      addressCountry: 'RU',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+7-999-000-00-00',
      contactType: 'customer service',
      availableLanguage: ['ru'],
    },
    makesOffer: [
      {
        '@type': 'Offer',
        name: 'Составление досудебной претензии',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock',
      },
    ],
  };

  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh bg-white text-gray-900">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
