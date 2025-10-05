import LeadForm from '@/components/LeadForm';

export default function Page() {
  return (
    <main>
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Вернём ваши деньги без суда: <span className="text-gray-600">досудебные претензии</span>
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Сначала разберёмся в вашей ситуации, затем составим сильную претензию и дадим инструкции — что, куда и как отправить.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li>• По ЗоЗПП и ГК РФ, без «воды»</li>
              <li>• Сроки, ссылки на закон, готовые шаблоны</li>
              <li>• Работаем по всей России</li>
            </ul>
            <a href="#lead" className="btn mt-8">Получить разбор</a>
          </div>
          <div className="card">
            <LeadForm />
          </div>
        </div>
      </section>

      <section id="lead" className="container py-12">
        <h2 className="text-2xl font-bold mb-4">Оставьте заявку — ответим в течение дня</h2>
        <div className="card">
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
