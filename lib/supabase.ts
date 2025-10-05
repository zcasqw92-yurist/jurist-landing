import { createClient, SupabaseClient } from '@supabase/supabase-js';

function env(k: string) { return process.env[k]?.trim(); }

function getUrl() {
  return env('NEXT_PUBLIC_SUPABASE_URL') ?? env('SUPABASE_URL') ?? '';
}
function getAnon() {
  return env('NEXT_PUBLIC_SUPABASE_ANON_KEY') ?? env('SUPABASE_ANON_KEY') ?? '';
}
function getService() {
  return env('SUPABASE_SERVICE_ROLE_KEY') ?? env('SUPABASE_SERVICE_ROLE') ?? '';
}

function makeClient(url: string, key: string): SupabaseClient {
  return createClient(url, key, {
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
  });
}

let _admin: SupabaseClient | null = null;
let _client: SupabaseClient | null = null;

export function getSupabaseAdmin() {
  const url = getUrl();
  const service = getService();
  if (!url || !service) {
    throw new Error(
      `Supabase admin env is missing: url=${Boolean(url)}, service=${Boolean(service)}`
    );
  }
  _admin ??= makeClient(url, service);
  return _admin;
}

export function getSupabaseClient() {
  const url = getUrl();
  const anon = getAnon();
  if (!url || !anon) {
    throw new Error(
      `Supabase client env is missing: url=${Boolean(url)}, anon=${Boolean(anon)}`
    );
  }
  _client ??= makeClient(url, anon);
  return _client;
}
