export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const has = (k: string) => Boolean(process.env[k] && process.env[k]!.trim().length);
  return new Response(
    JSON.stringify({
      env: {
        NEXT_PUBLIC_SUPABASE_URL: has('NEXT_PUBLIC_SUPABASE_URL'),
        SUPABASE_URL: has('SUPABASE_URL'),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: has('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
        SUPABASE_ANON_KEY: has('SUPABASE_ANON_KEY'),
        SUPABASE_SERVICE_ROLE_KEY: has('SUPABASE_SERVICE_ROLE_KEY'),
      }
    }),
    { headers: { 'content-type': 'application/json' } }
  );
}
