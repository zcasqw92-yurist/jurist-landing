import { createClient } from '@supabase/supabase-js';

function required(name: string) {
  const v = process.env[name];
  return v && v.trim().length ? v : undefined;
}

function getUrl() {
  // принимает и NEXT_PUBLIC_SUPABASE_URL, и SUPABASE_URL
  return required('NEXT_PUBLIC_SUPABASE_URL') ?? required('SUPABASE_URL');
}

export function getSupabaseClient() {
  const url = getUrl();
  const anon = required('NEXT_PUBLIC_SUPABASE_ANON_KEY') ?? required('SUPABASE_ANON_KEY');
  if (!url || !anon) {
    throw new Error(
      `Supabase client env missing: need NEXT_PUBLIC_SUPABASE_URL (или SUPABASE_URL) и NEXT_PUBLIC_SUPABASE_ANON_KEY (или SUPABASE_ANON_KEY)`
    );
  }
  return createClient(url, anon);
}

export function getSupabaseAdmin() {
  const url = getUrl();
  const serviceRole = required('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceRole) {
    throw new Error(
      `Supabase admin env missing: нужно NEXT_PUBLIC_SUPABASE_URL (или SUPABASE_URL) + SUPABASE_SERVICE_ROLE_KEY`
    );
  }
  return createClient(url, serviceRole);
}
