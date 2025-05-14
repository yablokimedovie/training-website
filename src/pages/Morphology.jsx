function Morphology() {
  return (
    <main className="container px-4 py-4">
      <article>
        <section>
          <h3 className="h3 text-success">Зовнішній вигляд</h3>
          <p>Зовнішній вигляд вовка свідчить про його міць та пристосування до тривалого бігу при переслідуванні своїх жертв.</p>
        </section>
        <section>
          <h3 className="h3 text-success">Особливості будови</h3>
          <ul>
            <li>Висота в плечах 80—95 см.</li>
            <li>Вага зазвичай 45—60 кг.</li>
            <li>Дорослий вовк зазвичай більший за вівчарку: довжина тіла з головою і без хвоста досягає 135—160 см, хвіст —40—52 см.</li>
          </ul>
        </section>
        <figure className="text-center">
          <img src="/images/8hMRXCC1VkBzfHxd45Vk.webp" alt="Сірий вовк в лісі" className="img-fluid rounded my-4"/>
          <figcaption className="text-muted">Молодий Сірий вовк</figcaption>
        </figure>
      </article>
    </main>
  );
}

export default Morphology;