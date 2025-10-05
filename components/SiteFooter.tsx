import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-600">
        <span>© 2025 jurist.spb</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:underline">Политика конфиденциальности</Link>
          <Link href="/offer" className="hover:underline">Оферта</Link>
        </div>
      </div>
    </footer>
  );
}
