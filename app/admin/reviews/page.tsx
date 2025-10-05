'use client';
import { useEffect, useState } from 'react';

type Review = { id: string; author: string; text: string; rating: number; created_at: string; is_published: boolean };

export default function AdminReviews() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    setLoading(true); setMsg(null);
    const res = await fetch('/api/reviews/moderate', {
      headers: { 'x-admin': process.env.NEXT_PUBLIC_DUMMY || '' } // игнорируется, доступ даёт cookie (middleware)
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok || !data.ok) { setMsg(data.error || 'Ошибка'); return; }
    setItems(data.reviews || []);
  }

  async function action(id: string, act: 'publish' | 'delete') {
    const res = await fetch('/api/reviews/moderate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id, action: act })
    });
    const data = await res.json();
    if (!res.ok || !data.ok) setMsg(data.error || 'Ошибка'); else load();
  }

  useEffect(() => { load(); }, []);

  return (
    <main className="container py-10">
      <h1 className="h2 mb-4">Модерация отзывов</h1>
      {loading && <p>Загрузка…</p>}
      {msg && <p className="text-sm">{msg}</p>}
      <div className="grid md:grid-cols-2 gap-4">
        {items.map(r => (
          <div key={r.id} className="card">
            <div className="flex items-center justify-between">
              <strong>{r.author}</strong>
              <span>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
            </div>
            <p className="text-sm text-gray-700 mt-2">{r.text}</p>
            <div className="flex gap-2 mt-3">
              <button className="btn btn-primary" onClick={() => action(r.id, 'publish')}>Опубликовать</button>
              <button className="btn" onClick={() => action(r.id, 'delete')}>Удалить</button>
            </div>
          </div>
        ))}
        {!loading && items.length === 0 && <p>Нет отзывов на модерации.</p>}
      </div>
    </main>
  );
}
