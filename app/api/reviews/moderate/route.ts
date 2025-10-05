import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function assertAdmin(req: Request) {
  const header = req.headers.get('x-admin') ?? '';
  const ok = header && process.env.ADMIN_PASSWORD && header === process.env.ADMIN_PASSWORD;
  if (!ok) throw new Error('Unauthorized');
}

// Получить список на модерации
export async function GET(req: Request) {
  try {
    assertAdmin(req);
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('reviews')
      .select('id, author, text, rating, created_at, is_published')
      .eq('is_published', false)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ ok: true, reviews: data });
  } catch (e: any) {
    const status = e?.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status });
  }
}

// Публикация/удаление
export async function POST(req: Request) {
  try {
    assertAdmin(req);
    const { id, action } = await req.json();

    if (!id || !['publish', 'delete'].includes(action)) {
      return NextResponse.json({ ok: false, error: 'id и action обязательны' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (action === 'publish') {
      const { error } = await supabase.from('reviews').update({ is_published: true }).eq('id', id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (error) throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    const status = e?.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status });
  }
}
