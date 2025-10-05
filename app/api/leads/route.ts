import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // на всякий случай отключаем кеш

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, message, source, website } = body || {};

    if (website) return NextResponse.json({ ok: true }); // honeypot
    if (!name || !(phone || email)) {
      return NextResponse.json({ ok: false, error: 'Имя и телефон/email обязательны' }, { status: 400 });
    }

    const userAgent = req.headers.get('user-agent') ?? null;
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null;

    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin
      .from('leads')
      .insert([{ name, phone, email, message, source, user_agent: userAgent, ip }]);

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}
