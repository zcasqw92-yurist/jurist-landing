import { NextResponse, NextRequest } from 'next/server';
import { createHmac } from 'crypto';

const ADMIN_COOKIE = 'admin_session';

function sign(val: string, secret: string) {
  return createHmac('sha256', secret).update(val).digest('hex');
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Разрешаем публичные страницы и API
  const publicPaths = [
    '/', '/privacy', '/offer', '/contacts',
    '/api/leads', '/api/reviews', '/api/_env'
  ];
  if (publicPaths.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next();
  }

  // Разрешаем страницу логина
  if (pathname.startsWith('/admin/login')) return NextResponse.next();

  // Всё остальное под /admin и /api/admin — только для авторизованного админа
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
    const secret = process.env.ADMIN_PASSWORD || '';
    const ok = !!cookie && secret && cookie === sign('ok', secret);
    if (!ok) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
