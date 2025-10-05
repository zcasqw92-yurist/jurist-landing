import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') ?? '12');

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('reviews')
    .select('author, text, rating, created_at')
    .order('created_at', { ascending: false })
    .limit(Math.min(Math.max(limit, 1), 50));

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, reviews: data });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { author, text, rating, website } = body || {};

    // honeypot
    if (website) return NextResponse.json({ ok: true });

    if (!author || !text) {
      return NextResponse.json({ ok: false, error: 'Заполните имя и текст отзыва' }, { status: 400 });
    }
    const r = Number(rating ?? 5);
    const safeRating = Number.isFinite(r) ? Math.min(5, Math.max(1, Math.round(r))) : 5;

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('reviews')
      .insert([{ author, text, rating: safeRating }]);

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}
