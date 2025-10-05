import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, comment, website } = body || {};

    // honeypot
    if (website) return NextResponse.json({ ok: true });
    if (!name || !phone) {
      return NextResponse.json({ ok: false, error: 'Имя и телефон обязательны' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from('leads').insert([{ name, phone, comment }]);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}
