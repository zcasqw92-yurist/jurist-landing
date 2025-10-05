import { getSupabaseAdmin } from '@/lib/supabase';

export type HeroSettings = {
  badge?: string;
  title?: string;
  subtitle?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
};

export async function loadSettings<T = unknown>(key: string): Promise<T | null> {
  const s = getSupabaseAdmin();
  const { data, error } = await s.from('settings').select('value').eq('key', key).single();
  if (error) return null;
  return (data?.value as T) ?? null;
}
