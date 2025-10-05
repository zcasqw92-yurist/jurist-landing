import LeadForm from "./components/LeadForm";

export default function HomePage({ searchParams }: { searchParams?: { sent?: string } }) {
  const sent = searchParams?.sent === "1";
  return (
    <main className="min-h-screen p-6">
      <section className="max-w-xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Разберём ваш случай бесплатно</h1>
        {sent && <p className="text-green-600">Заявка отправлена, мы свяжемся с вами.</p>}
        <LeadForm />
      </section>
    </main>
  );
}
