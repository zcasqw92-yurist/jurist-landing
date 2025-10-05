'use client';

import { useState } from 'react';

export default function LeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setSending(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, comment }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Ошибка отправки');
      setMsg('Заявка принята! Мы свяжемся с вами.');
      setName(''); setPhone(''); setComment('');
    } catch (err: any) {
      setMsg(err?.message || 'Ошибка отправки');
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 w-full max-w-md">
      <input
        className="w-full border rounded p-2"
        placeholder="Ваше имя"
        value={name}
        onChange={e=>setName(e.target.value)}
        required
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Телефон"
        value={phone}
        onChange={e=>setPhone(e.target.value)}
        required
      />
      <textarea
        className="w-full border rounded p-2"
        placeholder="Коротко о ситуации"
        value={comment}
        onChange={e=>setComment(e.target.value)}
        rows={4}
      />
      <button
        className="px-4 py-2 rounded bg-black text-white disabled:opacity-60"
        disabled={sending}
        type="submit"
      >
        {sending ? 'Отправляем…' : 'Разобрать мой случай'}
      </button>
      {msg && <p className={/ошиб/i.test(msg) ? 'text-red-600' : 'text-green-600'}>{msg}</p>}
    </form>
  );
}
