import LeadForm from "./components/LeadForm";

// В NEXT 15 searchParams — Promise. Делаем компонент async и "await" внутри.
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
      {/* HERO */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Досудебные претензии • Жалобы • Возврат денег (СПб)
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Практика вместо воды. Разберём ваш случай, подскажем шаги и подготовим документ,
              который реально работает до суда.
            </p>
            {sent && (
              <p className="mt-4 text-green-600">
                Заявка отправлена, мы свяжемся с вами.
              </p>
            )}
          </div>

          <div className="max-w-xl md:ml-auto">
            <div className="p-6 bg-white border rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Разберём ваш случай бесплатно</h2>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-2xl">
            <h3 className="font-semibold">Сильные претензии</h3>
            <p className="text-gray-600 mt-2">
              Чёткая структура: факты → норма → требования. Без канцелярита и «воды».
            </p>
          </div>
          <div className="p-6 border rounded-2xl">
            <h3 className="font-semibold">Экономим ваше время</h3>
            <p className="text-gray-600 mt-2">
              До 70% кейсов решаем без суда: правильный досудебный документ = быстрый результат.
            </p>
          </div>
          <div className="p-6 border rounded-2xl">
            <h3 className="font-semibold">Прозрачно по цене</h3>
            <p className="text-gray-600 mt-2">
              Фиксированная стоимость, понятные сроки и этапы. Без навязанных «допов».
            </p>
          </div>
        </div>
      </section>

      {/* КЕЙСЫ (пример-заглушка) */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Недавние кейсы</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="p-6 bg-white border rounded-2xl">
              <h4 className="font-semibold">Возврат предоплаты</h4>
              <p className="text-gray-600 mt-2">
                Просрочка исполнения → претензия → деньги вернули в 10 дней.
              </p>
            </div>
            <div className="p-6 bg-white border rounded-2xl">
              <h4 className="font-semibold">Маркетплейс</h4>
              <p className="text-gray-600 mt-2">
                Жалоба + претензия продавцу → снятие копий карточек и компенсация.
              </p>
            </div>
            <div className="p-6 bg-white border rounded-2xl">
              <h4 className="font-semibold">Ремонт/услуги</h4>
              <p className="text-gray-600 mt-2">
                Ненадлежащее качество → претензия → перерасчёт и возврат части стоимости.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (пример-заглушка) */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Частые вопросы</h2>
          <div className="mt-6 space-y-4">
            <details className="p-4 border rounded-2xl">
              <summary className="font-medium">Сколько стоит подготовка претензии?</summary>
              <p className="text-gray-600 mt-2">
                Зависит от сложности материалов. Базовые случаи — фикс, сложные — по оценке.
              </p>
            </details>
            <details className="p-4 border rounded-2xl">
              <summary className="font-medium">Нужны ли оригиналы чеков/договоров?</summary>
              <p className="text-gray-600 mt-2">
                Для претензии достаточно копий/сканов. Оригиналы — уже в суд.
              </p>
            </details>
            <details className="p-4 border rounded-2xl">
              <summary className="font-medium">Сколько это занимает по времени?</summary>
              <p className="text-gray-600 mt-2">
                Обычно 1–3 рабочих дня после получения всех данных и документов.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-semibold">Нужна помощь сейчас?</h2>
              <p className="text-gray-600 mt-2">
                Оставьте контакты — свяжемся и предложим план действий под вашу ситуацию.
              </p>
            </div>
            <div className="max-w-xl md:ml-auto">
              <div className="p-6 bg-white border rounded-2xl shadow-sm">
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
