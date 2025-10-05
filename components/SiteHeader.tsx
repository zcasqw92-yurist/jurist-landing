'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 bg-white/70 backdrop-blur ${scrolled ? 'border-b border-gray-200' : ''}`}>
      <div className="container flex items-center justify-between h-14 md:h-16">
        <Link href="/" className="font-semibold">jurist.<span className="text-blue-600">spb</span></Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#services" className="hover:underline">Услуги</a>
          <a href="#cases" className="hover:underline">Кейсы</a>
          <a href="#faq" className="hover:underline">FAQ</a>
          <Link href="/contacts" className="hover:underline">Контакты</Link>
        </nav>
        <a href="#lead" className="btn btn-primary text-sm">Разобрать мой случай</a>
      </div>
    </header>
  );
}
