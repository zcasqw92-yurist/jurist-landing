import Hero from '@/components/Hero';
import Services from '@/components/Services';
import RecentCases from '@/components/RecentCases';
import Faq from '@/components/Faq';
import FooterCta from '@/components/FooterCta';
import LeadForm from '@/components/LeadForm';

export default function Page() {
  return (
    <main>
      <Hero />
      <section id="lead" className="section">
        <div className="container">
          <h2 className="h2 mb-4">Разберём ваш случай бесплатно</h2>
          <div className="card max-w-3xl">
            <LeadForm />
          </div>
        </div>
      </section>
      <Services />
      <RecentCases />
      <Faq />
      <FooterCta />
    </main>
  );
}
