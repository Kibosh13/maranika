import { Link } from "react-router-dom";
import { sizeChart, SIZES, asset } from "../data";

export default function Sizes() {
  return (
    <section className="page-wrap sizes-page">
      <header className="sizes-top">
        <div>
          <p className="kicker">XS — 3XL</p>
          <h1>На любую фигуру</h1>
        </div>
        <p className="lead">
          Один и тот же характер кроя в семи размерах. Большой размер здесь не «добавлен потом» —
          поддержка заложена в бретель, чашку и пояс.
        </p>
      </header>

      <div className="size-row big">
        {SIZES.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>

      <div className="sizes-body">
        <div className="table-wrap">
          <table>
            <caption>Сантиметры, мерки по белью</caption>
            <thead>
              <tr>
                <th>Размер</th>
                <th>Грудь</th>
                <th>Талия</th>
                <th>Бёдра</th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row) => (
                <tr key={row.size}>
                  <th>{row.size}</th>
                  <td>{row.bust}</td>
                  <td>{row.waist}</td>
                  <td>{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <figure className="wide-photo">
          <img src={asset("/images/detail-fit.jpg")} alt="Шов и драпировка ткани RANIKA" />
          <figcaption>Посадка начинается со шва, а не с размера на бирке.</figcaption>
        </figure>
      </div>

      <div className="prose two">
        <div>
          <h2>Как снять мерку</h2>
          <ol>
            <li>Грудь — по самой полной точке, лента параллельно полу.</li>
            <li>Талия — в самом узком месте, не втягивая живот.</li>
            <li>Бёдра — по самым широким точкам.</li>
          </ol>
          <p>Если мерки разошлись на соседние размеры, берите больший: ткань плотная и почти не тянется «в запас».</p>
        </div>
        <div>
          <h2>Модели с поддержкой</h2>
          <p>
            Balconette, High Waist и Sculpt Ring держат грудь увереннее треугольника. Завязки Tie Side
            подгоняют бедро точечно.
          </p>
          <p>Обмен размера — 14 дней, если сохранены бирки и гигиеническая накладка.</p>
          <Link to="/catalog/plus" className="btn ghost">
            Смотреть поддержку <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
