// app/components/LeadForm.tsx
'use client';

import { useState } from "react";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();            // не даём странице перезагружаться
    setMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, comment }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Ошибка отправки");
      }

      setMsg("Заявка принята! Свяжемся с вами в рабочее время.");
      setName(""); setPhone(""); setComment("");
    } catch (err: any) {
      setMsg(err?.message || "Ошибка отправки");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block">
        <span className="sr-only">Имя</span>
        <input
          className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="block">
        <span className="sr-only">Телефон</span>
        <input
          className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </label>

      <label className="block">
        <span className="sr-only">Комментарий</span>
        <textarea
          className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Коротко о ситуации"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition disabled:opacity-60"
      >
        {loading ? "Отправляем…" : "Отправить заявку"}
      </button>

      {msg && (
        <p className={msg.startsWith("Ошибка") ? "text-red-600" : "text-green-600"}>
          {msg}
        </p>
      )}
    </form>
  );
}
