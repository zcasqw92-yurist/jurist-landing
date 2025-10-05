import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

const ADMIN_COOKIE = 'admin_session';
function sign(val: string, secret: string) {
  return createHmac('sha256', secret).update(val).digest('hex');
}

export async function POST(req: NextRequest) {
  const secret = process.env.ADMIN_PASSWORD || '';
  if (!secret) return NextResponse.json({ ok: false, error: 'ADMIN_PASSWORD not set' }, { status: 500 });

  // logout (form post)
  if (req.headers.get('content-type') === 'application/x-www-form-urlencoded') {
    const body = await req.formData();
    if (body.get('logout') === '1') {
      const res = NextResponse.redirect(new URL('/admin/login', req.url));
      res.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, secure: true, path: '/', maxAge: 0 });
      return res;
    }
  }

  // login (json)
  const { password } = await req.json();
  if (!password || password !== secret) {
    return NextResponse.json({ ok: false, error: 'Неверный пароль' }, { status: 401 });
  }

  const token = sign('ok', secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 // 8 часов
  });
  return res;
}
