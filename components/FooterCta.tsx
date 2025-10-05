import LeadForm from '@/components/LeadForm';

export default function FooterCta() {
  return (
    <section className="section">
      <div className="container grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="h2">Нужна помощь сейчас?</h2>
          <p className="subtitle mt-2">Оставьте контакты — предложу план действий под вашу ситуацию.</p>
          <a href="#lead" className="btn btn-primary mt-6">Разобрать мой случай</a>
        </div>
        <div className="card max-w-sm md:ml-auto">
          <LeadForm compact />
        </div>
      </div>
    </section>
  );
}
