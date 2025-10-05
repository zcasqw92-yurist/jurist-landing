'use client';
import { useEffect, useState } from 'react';
import ReviewForm from '@/components/ReviewForm';

type Review = { author: string; text: string; rating: number; created_at: string };

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/reviews?limit=12', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Ошибка загрузки');
      setReviews(data.reviews || []);
    } catch (e: any) {
      setError(e.message || 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const avg = reviews.length ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length) : 0;

  return (
    <section id="reviews" className="section section-muted">
      <div className="container grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="h2">Отзывы клиентов</h2>
          {reviews.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              Средняя оценка: {avg.toFixed(1)} / 5 ({reviews.length})
            </p>
          )}

          {loading && <p className="text-gray-600 mt-4">Загружаем отзывы…</p>}
          {error && <p className="text-red-600 mt-4">{error}</p>}

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {reviews.map((r, i) => (
              <div className="card" key={i}>
                <div className="flex items-center justify-between">
                  <strong>{r.author}</strong>
                  <span aria-label={`${r.rating} из 5`}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                </div>
                <p className="text-gray-700 mt-2 text-sm">{r.text}</p>
              </div>
            ))}
            {!loading && reviews.length === 0 && (
              <p className="text-gray-600">Пока нет отзывов — будьте первым.</p>
            )}
          </div>
        </div>

        <div className="card max-w-lg lg:ml-auto" id="review">
          <h3 className="font-semibold mb-3">Оставить отзыв</h3>
          <ReviewForm onSubmitted={load} />
        </div>
      </div>
    </section>
  );
}
