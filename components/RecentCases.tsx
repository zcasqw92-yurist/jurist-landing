export default function RecentCases() {
  return (
    <section id="cases" className="section">
      <div className="container">
        <h2 className="h2 mb-6">Недавние кейсы</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="font-semibold">Возврат предоплаты</h3>
            <p className="text-gray-700 mt-2 text-sm">Просрочка → претензия → возврат за 10 дней.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold">Маркетплейс</h3>
            <p className="text-gray-700 mt-2 text-sm">Жалоба + претензия → снятие копий, компенсация.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold">Ремонт/услуги</h3>
            <p className="text-gray-700 mt-2 text-sm">Некачественно? Претензия → перерасчёт и возврат.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
