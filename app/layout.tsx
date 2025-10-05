import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Jurist Landing", description: "SPB lawyer" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="h-full scroll-smooth">
      <body className="min-h-full bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
