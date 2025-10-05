// lib/seo.ts
import type { Metadata } from "next";

// Базовые тексты (правь под себя)
export const siteTitle = "Досудебные претензии и возврат денег — СПб";
export const siteDescription =
  "Живой, практичный подход без воды. Разбор случая бесплатно. Досудебные претензии, жалобы, возврат денег — Санкт-Петербург и ЛО.";
export const siteOgImage = "/og-image.png";

// Хелпер для Next Metadata (опционально, удобно дергать в layout.tsx)
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

// ✅ ИМЕНОВАННЫЙ экспорт jsonLd — именно его ждёт app/page.tsx
export function jsonLd<T extends object>(data: T) {
  return { __html: JSON.stringify(data) };
}

// На всякий случай — дефолтный экспорт (можешь не использовать)
const seo = { siteTitle, siteDescription, siteOgImage };
export default seo;
