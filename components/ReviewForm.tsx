'use client';
import { useState } from 'react';

export default function ReviewForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [website, setWebsite] = useState(''); // honeypot
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!author || !text) {
      setError('Заполните имя и текст отзыва');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, text, rating, website }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Ошибка отправки');
      setDone(true);
      onSubmitted?.();
      setAuthor('');
      setText('');
      setRating(5);
    } catch (e: any) {
      setError(e.message || 'Ошибка отправки');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="text-center py-4">
        <p className="text-green-700">Спасибо за отзыв!</p>
        <button className="btn mt-3" onClick={() => setDone(false)}>Оставить ещё</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="label">Ваше имя *</label>
          <input className="input" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Алексей" />
        </div>
        <div>
          <label className="label">Оценка</label>
          <select className="input" value={rating} onChange={e => setRating(Number(e.target.value))}>
            {[5,4,3,2,1].map(v => <option key={v} value={v}>{v} ★</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="label">Текст отзыва *</label>
        <textarea className="input min-h-[100px]" value={text} onChange={e => setText(e.target.value)} placeholder="Коротко о работе, что понравилось" />
      </div>

      {/* honeypot */}
      <div className="hidden">
        <label>Ваш сайт</label>
        <input value={website} onChange={e => setWebsite(e.target.value)} />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button className="btn btn-primary w-full" disabled={loading}>
        {loading ? 'Отправляем…' : 'Оставить отзыв'}
      </button>
    </form>
  );
}
