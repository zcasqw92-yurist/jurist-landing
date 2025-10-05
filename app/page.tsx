import Hero from "./components/Hero";
import LeadForm from "./components/LeadForm";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const sp = (await searchParams) ?? {};
  const sentRaw = Array.isArray(sp.sent) ? sp.sent[0] : sp.sent;
  const sent = sentRaw === "1";

  return (
    <main className="min-h-screen">
      {/* HEADER */}
      {/* Если Header уже в layout, можно убрать эту строку */}
      {/* @ts-expect-error Server Component order */}
      <(await import("./components/Header")).default />

      {/* HERO */}
      <Hero sent={sent} />

      {/* ЧЕМ ПОМОГАЮ / УСЛУГИ */}
      <section id="services" className="py-14 border-b">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Чем помогаю</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="rounded-2xl border p-6">
              <h3 className="font-semibold">Досудебные претензии</h3>
              <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
                <li>Возврат денег (товары/услуги)</li>
                <li>Просрочка исполнения / некачественная услуга</li>
                <li>Поставки / подряд / аренда</li>
              </ul>
            </div>
            <div className="rounded-2xl border p-6">
              <h3 className="font-semibold">Жалобы и заявления</h3>
              <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
                <li>Роспотребнадзор, прокуратура, ЦБ, маркетплейсы</li>
                <li>Незаконные удержания, штрафы, навязанные услуги</li>
                <li>Оспаривание отказов и списаний</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="py-14 border-b">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-2xl">
            <h3 className="font-semibold">Сильные тексты</h3>
            <p className="text-gray-600 mt-2">Факты → норма → требование. Без воды.</p>
          </div>
          <div className="p-6 border rounded-2xl">
            <h3 className="font-semibold">Без суда — если можно</h3>
            <p className="text-gray-600 mt-2">Цели клиента важнее процесса.</p>
          </div>
          <div className="p-6 border rounded-2xl">
            <h3 className="font-semibold">Прозрачная цена</h3>
            <p className="text-gray-600 mt-2">Фикс и понятные сроки.</p>
          </div>
        </div>
      </section>

      {/* CTA НИЖЕ */}
      <section id="contacts" className="py-14">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold">Нужна помощь сейчас?</h2>
            <p className="text-gray-600 mt-2">
              Оставьте контакты — свяжусь и предложу план действий под вашу ситуацию.
            </p>
            <a href="#lead" className="inline-block mt-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition">
              Разобрать мой случай
            </a>
          </div>
          <div className="max-w-xl md:ml-auto">
            <div className="rounded-2xl border p-6">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-8 text-sm text-gray-600">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-4">
          <div>© {new Date().getFullYear()} jurist.spb</div>
          <div className="flex gap-4">
            <a href="/policy" className="hover:text-gray-900">Политика конфиденциальности</a>
            <a href="/offer" className="hover:text-gray-900">Оферта</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
