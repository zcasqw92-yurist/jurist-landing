'use client';
import { useState } from 'react';

type Form = {
  name: string;
  phone: string;
  message: string;
  website?: string; // honeypot для защиты от спама
};

export default function LeadForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<Form>({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.phone) {
      setError('Укажите имя и телефон');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          comment: form.message, // 👈 кладём в comment, как в БД
          website: form.website, // honeypot-поле
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Ошибка отправки');
      setDone(true);
    } catch (err: any) {
      setError(err.message || 'Ошибка отправки');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold">Спасибо! Заявка принята.</h3>
        <p className="text-gray-600 mt-2">Мы свяжемся с вами в течение дня.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? 'space-y-3' : 'space-y-4'}>
      <div className={compact ? 'grid grid-cols-1 gap-3' : 'grid md:grid-cols-2 gap-4'}>
        <div>
          <label className="label">Имя *</label>
          <input
            className="input"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Как к вам обращаться"
          />
        </div>
        <div>
          <label className="label">Телефон *</label>
          <input
            className="input"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="+7 (___) ___-__-__"
          />
        </div>
      </div>

      <div>
        <label className="label">Коротко о ситуации</label>
        <textarea
          className="input min-h-[100px]"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          placeholder="Опишите проблему или вопрос"
        />
      </div>

      {/* honeypot */}
      <div className="hidden">
        <label>Ваш сайт</label>
        <input
          value={form.website || ''}
          onChange={e => setForm({ ...form, website: e.target.value })}
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button className="btn btn-primary w-full" disabled={loading}>
        {loading ? 'Отправляем…' : 'Отправить заявку'}
      </button>

      <p className="text-xs text-gray-500">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
      </p>
    </form>
  );
}
