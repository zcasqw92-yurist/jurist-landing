import { createClient } from '@supabase/supabase-js';

// Ленивая инициализация, без кэша fetch
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !serviceRole) throw new Error('Supabase admin env is missing');

  // ВАЖНО: cache: 'no-store' — запрет кэширования ответов
  const client = createClient(url, serviceRole, {
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
    },
  });

  return client;
}

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  if (!url || !anon) throw new Error('Supabase client env is missing');

  const client = createClient(url, anon, {
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
    },
  });

  return client;
}
