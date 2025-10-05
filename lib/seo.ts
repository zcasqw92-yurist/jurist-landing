// lib/seo.ts
import type { Metadata } from "next";

// Базовые тексты для сайта
export const siteTitle = "Досудебные претензии и возврат денег — СПб";
export const siteDescription =
  "Живой, практичный подход без воды. Разбор случая бесплатно. Досудебные претензии, жалобы, возврат денег — Санкт-Петербург и ЛО.";
export const siteOgImage = "/og-image.png";

// Универсальный объект SEO (часто удобно импортировать целиком)
export const seo = {
  title: siteTitle,
  description: siteDescription,
  ogImage: siteOgImage,
};

// На всякий случай экспортируем под несколькими именами,
// чтобы не упасть, если где-то ждали другое имя.
export const meta = seo;

// Хелпер для Next Metadata (можно вызвать в layout/page при желании)
export function buildMetadata(baseUrl?: string): Metadata {
  const metadataBase = baseUrl ? new URL(baseUrl.replace(/\/+$/, "")) : undefined;
  return {
    metadataBase,
    title: siteTitle,
    description: siteDescription,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      title: siteTitle,
      description: siteDescription,
      images: [siteOgImage],
    },
    twitter: {
      card: "summary_large_image",
      images: [siteOgImage],
    },
  };
}

export default seo;
