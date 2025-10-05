'use client';
import { useState } from 'react';

export default function AdminLogin() {
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      const res = await fetch('/api/admin/session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ password: pwd }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Ошибка входа');
      window.location.href = '/admin';
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container py-16 max-w-md">
      <h1 className="h2 mb-4">Вход в админ-панель</h1>
      <form onSubmit={onSubmit} className="space-y-4 card">
        <input className="input" type="password" placeholder="Пароль администратора"
               value={pwd} onChange={e=>setPwd(e.target.value)} />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? 'Входим…' : 'Войти'}
        </button>
      </form>
    </main>
  );
}
