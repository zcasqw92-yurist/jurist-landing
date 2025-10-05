'use client';

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">jurist<span className="text-blue-600">.spb</span></Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#services" className="hover:text-gray-900 text-gray-600">Услуги</a>
          <a href="#cases" className="hover:text-gray-900 text-gray-600">Кейсы</a>
          <a href="#faq" className="hover:text-gray-900 text-gray-600">FAQ</a>
          <a href="#contacts" className="hover:text-gray-900 text-gray-600">Контакты</a>
        </nav>

        <a href="#lead" className="rounded-md bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-sm transition">
          Разобрать мой случай
        </a>
      </div>
    </header>
  );
}
