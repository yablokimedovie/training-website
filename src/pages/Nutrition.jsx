function Nutrition() {
  return (
    <main className="container px-4 py-4 flex-grow-1">
      <section>
        <h2 className="h2 text-success mb-4">Харчування Сірих вовків</h2>
        <p>Вовк — типовий хижак, що добуває їжу самостійно активним пошуком та переслідуванням жертв. Їх раціон включає:</p>
        <ul className="list-group">
          <li className="list-group-item">В тундрі — дикі та свійські північні олені.</li>
          <li className="list-group-item">В лісовій зоні — лосі, сарни, дикі свині, свійські вівці, корови, коні.</li>
          <li className="list-group-item">В степу та пустелі — антилопи різних видів та вівці.</li>
          <li className="list-group-item">В горах — дикі та свійські кози.</li>
        </ul>
      </section>
    </main>
  );
}

export default Nutrition;