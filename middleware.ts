// 👇 Обязательно: заставляем Vercel выполнять middleware в Node.js
export const runtime = 'nodejs';

import { NextResponse, type NextRequest } from 'next/server';
import crypto from 'crypto'; // 👈 импорт через default — безопасно для Node

const ADMIN_COOKIE = 'admin_session';

// Функция подписи токена
function sign(val: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(val).digest('hex');
}

export function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;

    // 1️⃣ Публичные страницы и API
    const publicPaths = [
      '/', '/privacy', '/offer', '/contacts',
      '/api/leads', '/api/reviews', '/api/_env',
    ];
    if (publicPaths.some(p => pathname === p || pathname.startsWith(p + '/'))) {
      return NextResponse.next();
    }

    // 2️⃣ Страница входа разрешена
    if (pathname.startsWith('/admin/login')) return NextResponse.next();

    // 3️⃣ Проверяем доступ администратора
    if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
      const secret = process.env.ADMIN_PASSWORD;
      if (!secret) {
        console.warn('⚠️ ADMIN_PASSWORD not set — skipping auth');
        return NextResponse.next();
      }

      const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
      const ok = !!cookie && cookie === sign('ok', secret);
      if (!ok) {
        const url = req.nextUrl.clone();
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (err: any) {
    console.error('❌ Middleware crashed:', err?.message || err);
    // чтобы не падать 500, просто пропускаем
    return NextResponse.next();
  }
}

// 4️⃣ Конфиг — без сложных regexp
export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/api/admin/moderate',
    '/api/admin/settings',
  ],
};
