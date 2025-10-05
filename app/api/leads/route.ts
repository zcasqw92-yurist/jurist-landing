import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs'; // гарантируем server runtime

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, message, source, website } = body || {};

    // Honeypot
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !(phone || email)) {
      return NextResponse.json({ ok: false, error: 'Имя и телефон/email обязательны' }, { status: 400 });
    }

    const userAgent = req.headers.get('user-agent') ?? null;
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null;

    // Ленивая инициализация — упадёт здесь только при реальном вызове, а не на сборке
    const supabaseAdmin = getSupabaseAdmin();

    const { error } = await supabaseAdmin
      .from('leads')
      .insert([{ name, phone, email, message, source, user_agent: userAgent, ip }]);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    // Если ENV не заданы — будет понятная ошибка
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}
