import type { Metadata } from "next";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Досудебные претензии и возврат денег — СПб",
  description: "Живой, практичный подход без воды. Разбор случая бесплатно.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Досудебные претензии и возврат денег — СПб",
    description: "Живой, практичный подход без воды. Разбор случая бесплатно.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
