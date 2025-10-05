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
    <main className="min-h-screen p-6">
      <section className="max-w-xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Разберём ваш случай бесплатно</h1>
        {sent && <p className="text-green-600">Заявка отправлена, мы свяжемся с вами.</p>}
        <LeadForm />
      </section>
    </main>
  );
}
