// app/api/admin/settings/route.ts
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const s = getSupabaseAdmin();
  const { data, error } = await s
    .from('settings')
    .select('key, value')
    .order('key');

  if (error) {
    console.error('GET /api/admin/settings:', error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, settings: data });
}

export async function PUT(req: Request) {
  try {
    const { key, value } = await req.json();
    if (!key) return NextResponse.json({ ok: false, error: 'key required' }, { status: 400 });

    const s = getSupabaseAdmin();
    const { error } = await s
      .from('settings')
      .upsert({ key, value, updated_at: new Date().toISOString() });

    if (error) {
      console.error('PUT /api/admin/settings:', error.message);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}
