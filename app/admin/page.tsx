export default function AdminHome() {
  return (
    <main className="container py-10 space-y-4">
      <h1 className="h2">Админ-панель</h1>
      <div className="card">
        <ul className="list-disc pl-6">
          <li><a className="underline" href="/admin/settings">Настройки сайта</a></li>
          <li><a className="underline" href="/admin/reviews">Модерация отзывов</a></li>
        </ul>
      </div>
      <form action="/api/admin/session" method="post">
        <input type="hidden" name="logout" value="1" />
        <button className="btn mt-4">Выйти</button>
      </form>
    </main>
  );
}
