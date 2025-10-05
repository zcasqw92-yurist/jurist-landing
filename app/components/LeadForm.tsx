'use client';

import { useState } from 'react';

export default function LeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); // блокируем перезагрузку страницы
    setMsg('');
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, comment }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Ошибка отправки');
      }
      setMsg('Заявка принята! Мы свяжемся с вами.');
      setName(''); setPhone(''); setComment('');
    } catch (err: any) {
      setMsg(err?.message || 'Ошибка отправки');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        className="w-full border rounded p-2"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Телефон"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <textarea
        className="w-full border rounded p-2"
        placeholder="Коротко о ситуации"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit" disabled={loading}
  className="w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition">
  {loading ? 'Отправляем…' : 'Отправить'}
</button>
      {msg && (
        <p className={msg.startsWith('Ошибка') ? 'text-red-600' : 'text-green-600'}>
          {msg}
        </p>
      )}
    </form>
  );
}
