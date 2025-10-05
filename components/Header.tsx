'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Container from './Container'

export default function Header(){
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <Container className="flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="На главную">
          <Image src="/logo.svg" alt="" width={120} height={28} priority />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#services" className="hover:text-brand-700">Услуги</a>
          <a href="#cases" className="hover:text-brand-700">Кейсы</a>
          <a href="#faq" className="hover:text-brand-700">FAQ</a>
          <a href="#contacts" className="hover:text-brand-700">Контакты</a>
          <a href="#cta" className="px-4 py-2 rounded-full bg-brand-600 text-white hover:bg-brand-700">Разбор случая</a>
        </nav>
        <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border" aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(v=>!v)}>
          <span className="sr-only">Открыть меню</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </Container>
      <div id="mobile-menu" hidden={!open} className="md:hidden border-t border-slate-200">
        <Container>
          <div className="flex flex-col py-3 gap-2">
            <a href="#services" onClick={()=>setOpen(false)} className="py-2">Услуги</a>
            <a href="#cases" onClick={()=>setOpen(false)} className="py-2">Кейсы</a>
            <a href="#faq" onClick={()=>setOpen(false)} className="py-2">FAQ</a>
            <a href="#contacts" onClick={()=>setOpen(false)} className="py-2">Контакты</a>
            <a href="#cta" onClick={()=>setOpen(false)} className="py-2 rounded-md bg-brand-600 text-white text-center">Разбор случая</a>
          </div>
        </Container>
      </div>
    </header>
  )
}
