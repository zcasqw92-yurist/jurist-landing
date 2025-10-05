export const runtime = 'nodejs'; // 👈 обязательно

import { NextResponse, NextRequest } from 'next/server';
import { createHmac } from 'crypto';

const ADMIN_COOKIE = 'admin_session';

function sign(val: string, secret: string) {
  return createHmac('sha256', secret).update(val).digest('hex');
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔹 Public routes
  const publicPaths = [
    '/', '/privacy', '/offer', '/contacts',
    '/api/leads', '/api/reviews', '/api/_env'
  ];
  if (publicPaths.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next();
  }

  // 🔹 Allow login page
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // 🔹 Protect admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const secret = process.env.ADMIN_PASSWORD;
    if (!secret) {
      console.error('ADMIN_PASSWORD not set in environment');
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
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/api/admin/moderate',
    '/api/admin/settings',
  ],
};
