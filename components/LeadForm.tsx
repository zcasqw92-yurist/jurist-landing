'use client';
import { useEffect, useMemo, useState } from 'react';
import { trackLead } from '@/lib/analytics';

type Form = {
  name: string;
  phone: string;
  message: string;
  website?: string; // honeypot для защиты от спама
};

type Utms = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  referrer?: string | null;
  page?: string | null;
};

export default function LeadForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<Form>({ name: '', phone: '', message: '' });
  const [utms, setUtms] = useState<Utms>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Собираем UTM-метки и системные поля при монтировании
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sp = new URLSearchParams(window.location.search);
    setUtms({
      utm_source: sp.get('utm_source'),
      utm_medium: sp.get('utm_medium'),
      utm_campaign: sp.get('utm_campaign'),
      utm_content: sp.get('utm_content'),
      utm_term: sp.get('utm_term'),
      referrer: document.referrer || null,
      page: window.location.pathname + window.location.search,
    });
  }, []);

  // Нормализуем телефон (только цифры) — на бэке всё равно валидируй
  const normalizedPhone = useMemo(() => form.phone.replace(/[^\d+]/g, ''), [form.phone]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError(null);

    if (!form.name.trim() || !normalizedPhone) {
      setError('Укажите имя и телефон');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: normalizedPhone,
          comment: form.message?.trim() || '',
          website: form.website, // honeypot
          ...utms,               // UTM + referrer + page
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || 'Ошибка отправки');
      }

      // аналитика
      trackLead();

      setDone(true);
    } catch (err: any) {
      setError(err?.message || 'Ошибка отправки');
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
          <label className="label" htmlFor="lead-name">Имя *</label>
          <input
            id="lead-name"
            name="name"
            className="input"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Как к вам обращаться"
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="lead-phone">Телефон *</label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            className="input"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="+7 (___) ___-__-__"
            autoComplete="tel"
            inputMode="tel"
            required
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="lead-message">Коротко о ситуации</label>
        <textarea
          id="lead-message"
          name="message"
          className="input min-h-[100px]"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          placeholder="Опишите проблему или вопрос"
        />
      </div>

      {/* honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="lead-website">Ваш сайт</label>
        <input
          id="lead-website"
          name="website"
          value={form.website || ''}
          onChange={e => setForm({ ...form, website: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
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
