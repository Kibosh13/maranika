import { asset } from "../data";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="page-wrap about-page">
      <header className="about-top">
        <div>
          <p className="kicker">For every shape of beauty</p>
          <h1>О бренде</h1>
        </div>
        <p className="lead">
          MARANIKA шьёт купальники для разных фигур. Строго по форме, тепло по цвету. Красота здесь не
          один силуэт, а точность посадки.
        </p>
      </header>

      <figure className="about-hero">
        <img src={asset("/images/hero-coast.jpg")} alt="Скалистый берег на закате — настроение дома MARANIKA" />
        <figcaption>
          <p className="kicker">Философия</p>
          <p>Разные формы. Одна красота.</p>
        </figcaption>
      </figure>

      <div className="about-story">
        <article>
          <p className="kicker">01</p>
          <h2>Крой от фигуры</h2>
          <p>
            Мы не растягиваем маленькое лекало «ещё на размер». Градация от XS до 3XL строится отдельно:
            шире бретель, глубже чашка, спокойнее линия бедра. Кольцо остаётся тонким акцентом, а не
            украшением ради украшения.
          </p>
        </article>
        <article>
          <p className="kicker">02</p>
          <h2>Палитра дома</h2>
          <p>
            Айвори, песок, какао, тёплое золото и редкий ягодный тон — те же цвета, что на знаке.
            Ничего кричащего. Солнце делает остальное.
          </p>
        </article>
        <article>
          <p className="kicker">03</p>
          <h2>На весь день</h2>
          <p>
            Купальник должен пережить море, камень и город после берега. Ткань плотная и матовая,
            фурнитура — золотистый металл, который не спорит с кожей.
          </p>
          <Link to="/catalog" className="btn ghost">
            Смотреть коллекцию <span className="arrow">→</span>
          </Link>
        </article>
      </div>

      <section id="materials" className="materials">
        <div className="sec-head">
          <div>
            <p className="kicker">Материя</p>
            <h2>Ткань и кольцо</h2>
          </div>
          <Link to="/sizes">
            Таблица размеров <span className="arrow">→</span>
          </Link>
        </div>
        <div className="material-grid">
          <figure>
            <img src={asset("/images/detail-fabric.jpg")} alt="Свет на мокрой ткани" />
            <figcaption>
              <strong>Ткань</strong>
              Плотный матовый бифлекс. Держит форму во влажном виде и быстро отпускает воду.
            </figcaption>
          </figure>
          <figure>
            <img src={asset("/images/detail-hardware.jpg")} alt="Золотистое кольцо на какао-ткани" />
            <figcaption>
              <strong>Фурнитура</strong>
              Кольцо золотистого тона. После моря и бассейна его ополаскивают пресной водой.
            </figcaption>
          </figure>
          <figure>
            <img src={asset("/images/detail-fit.jpg")} alt="Линия шва" />
            <figcaption>
              <strong>Шов</strong>
              Двойная строчка по краю. Подкладка там, где нужна закрытость, и нигде лишним слоем.
            </figcaption>
          </figure>
        </div>
      </section>
    </section>
  );
}
