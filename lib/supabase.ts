import { createClient } from '@supabase/supabase-js';

const get = (k: string) => process.env[k]?.trim();

const url = () => get('NEXT_PUBLIC_SUPABASE_URL') ?? get('SUPABASE_URL');
const anon = () => get('NEXT_PUBLIC_SUPABASE_ANON_KEY') ?? get('SUPABASE_ANON_KEY');
const service = () => get('SUPABASE_SERVICE_ROLE_KEY') ?? get('SUPABASE_SERVICE_ROLE');

export function getSupabaseClient() {
  const u = url(), a = anon();
  if (!u || !a) throw new Error('Supabase client env missing');
  return createClient(u, a);
}

export function getSupabaseAdmin() {
  const u = url(), s = service();
  if (!u || !s) throw new Error('Supabase admin env missing');
  return createClient(u, s);
}
