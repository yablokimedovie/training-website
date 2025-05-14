import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Photo() {
  const images = [
    { src: '/images/4UhsJ4Eaz02SzpkOwDkW.webp', alt: 'Красивий Сірий вовк' },
    { src: '/images/8hMRXCC1VkBzfHxd45Vk.webp', alt: 'Сірий вовк в снігу' },
    { src: '/images/dLn9yYDKNWwibtevRAby.webp', alt: 'Сірий вовк' },
    { src: '/images/eQgIGJEvenB8A1Htabk9.webp', alt: 'Сірий вовк в лісі' },
    { src: '/images/rhEW0dL79HL5gz2iXWT9.webp', alt: 'Сірий вовк в квітах' },
    { src: '/images/SL9rV2Qn86VvlebsiXVT.webp', alt: 'Сірий вовк і зима' }
  ];

  return (
    <main className="container px-4 py-4 flex-grow-1">
      <article>
        <h2 className="h2 text-secondary mb-4">Фотогалерея Сірих вовків</h2>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {images.map((image, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <a href={image.src} target="_blank" rel="noopener noreferrer">
                  <img src={image.src} className="d-block w-100" alt={image.alt} />
                </a>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </article>
    </main>
  );
}

export default Photo;