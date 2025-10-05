export default function Services() {
  return (
    <section id="services" className="section section-muted">
      <div className="container">
        <h2 className="h2 mb-6">Чем помогаю</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-semibold mb-3">Досудебные претензии</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Возврат денег (товары/услуги)</li>
              <li>Просрочка исполнения / некачественная услуга</li>
              <li>Поставки / подряд / аренда</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-3">Жалобы и заявления</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Роспотребнадзор, прокуратура, ЦБ, маркетплейсы</li>
              <li>Незаконные удержания, штрафы, навязанные услуги</li>
              <li>Оспаривание отказов и списаний</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
