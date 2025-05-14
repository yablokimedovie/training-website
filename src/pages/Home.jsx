import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="container px-4 py-4">
    <section>
      <h2 className="h2 text-secondary">Ласкаво просимо!</h2>
      <p>Вітаємо на сайті про Сірих вовків! Дізнайтеся більше про їхню морфологію, харчування та популяцію, відвідавши відповідні розділи.</p>
      
      <h3 className="h3 text-secondary mt-4">Розділи сайту:</h3>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/morphology" className="text-secondary text-decoration-none">Зовнішній вигляд</Link> - Опис зовнішності та особливостей будови Сірих вовків
        </li>
        <li className="list-group-item">
          <Link to="/nutrition" className="text-secondary text-decoration-none">Харчування</Link> - Що їдять Сірі вовки та їх раціон
        </li>
        <li className="list-group-item">
          <Link to="/population" className="text-secondary text-decoration-none">Ареал</Link> - Де живуть Сірі вовки у світі
        </li>
        <li className="list-group-item">
          <Link to="/photo" className="text-secondary text-decoration-none">Фотогалерея</Link> - Колекція фотографій Сірих вовків
        </li>
      </ul>
    </section>
  </main>
  );
}

export default Home;