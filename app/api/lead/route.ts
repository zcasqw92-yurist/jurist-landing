import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

// Работать на Node проще (env не теряются)
export const runtime = 'nodejs';

function sanitize(s: unknown) {
  return typeof s === 'string' ? s.trim().slice(0, 500) : '';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = sanitize(body.name);
    const phone = sanitize(body.phone);
    const comment = sanitize(body.comment);

    if (!name || !phone) {
      return NextResponse.json({ ok: false, error: 'Укажите имя и телефон' }, { status: 400 });
    }

    const { error } = await supabaseServer.from('leads').insert({ name, phone, comment });
    if (error) {
      console.error('INSERT ERROR:', error.message);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('API /api/leads failed:', e?.message || e);
    return NextResponse.json({ ok: false, error: e?.message ?? 'Server error' }, { status: 500 });
  }
}
