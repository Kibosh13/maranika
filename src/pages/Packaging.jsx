import { Link } from "react-router-dom";
import { packs, formatPrice } from "../data";

export default function Packaging() {
  return (
    <section className="page-wrap">
      <header className="page-head">
        <p className="kicker">Упаковка</p>
        <h1>Бюджет и премиум</h1>
        <p className="lead">
          Две линии одного дома. Бюджетная входит в заказ. Премиум — отдельный ритуал, если вещь
          дарят или оставляют себе как предмет.
        </p>
      </header>

      <div className="pack-page">
        {packs.map((pack, i) => (
          <article key={pack.id} className={i % 2 ? "flip" : ""}>
            <img src={pack.image} alt={`${pack.title} упаковка MARANIKA`} />
            <div>
              <p className="kicker">
                0{i + 1} — {pack.kicker}
              </p>
              <h2>{pack.title}</h2>
              <p className="price">{pack.price ? `+ ${formatPrice(pack.price)}` : "Включено"}</p>
              <p>{pack.text}</p>
              {pack.id === "budget" ? (
                <ul>
                  <li>Плотный пакет с тиснением знака</li>
                  <li>Калька с золотым контуром фигуры</li>
                  <li>Матовый зип-пакет</li>
                  <li>Конверт, бирка и сургучная печать</li>
                </ul>
              ) : (
                <ul>
                  <li>Жёсткая коробка</li>
                  <li>Хлопковый мешок на атласных лентах</li>
                  <li>Сургуч со знаком</li>
                  <li>Открытка и две бирки</li>
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>

      <p className="center-cta">
        <Link to="/cart" className="btn ghost">
          Выбрать при заказе <span className="arrow">→</span>
        </Link>
      </p>
    </section>
  );
}
