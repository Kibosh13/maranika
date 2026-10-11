import { Link } from "react-router-dom";
import { asset } from "../data";

export default function Delivery() {
  return (
    <section className="page-wrap mood-page">
      <figure className="mood-hero">
        <img src={asset("/images/hero-coast.jpg")} alt="Тихий берег — настроение доставки RANIKA" />
        <figcaption>
          <p className="kicker">Доставка</p>
          <h1>Тихо и в срок</h1>
          <p>Отправляем по России. Срок в пути считается отдельно от сборки.</p>
        </figcaption>
      </figure>

      <div className="mood-split">
        <article>
          <p className="kicker">Условия</p>
          <h2>Оплата и сборка</h2>
          <p>Оплата доставки — при получении или при оформлении заказа.</p>
          <p>
            Срок доставки не включает сборку. В среднем заказ собирается 1–3 рабочих дня, если вещь
            есть на складе.
          </p>
        </article>
        <article className="mood-panel">
          <p className="kicker">После оформления</p>
          <h2>Менеджер напишет</h2>
          <p>Чтобы уточнить данные и способ доставки. Карту на сайте не списываем.</p>
          <Link to="/cart" className="btn light">
            Оформить заказ <span className="arrow">→</span>
          </Link>
        </article>
      </div>

      <div className="route-row">
        <article>
          <span>01</span>
          <h2>Москва и область</h2>
          <p>1–2 дня, курьер до двери. От 15&nbsp;000&nbsp;₽ доставка без доплаты.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Города</h2>
          <p>2–5 дней в пункт выдачи или до двери. Точный срок — после подтверждения.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Дальше</h2>
          <p>3–7 дней. Премиум-коробку не сжимаем: она едет как есть.</p>
        </article>
      </div>

      <div className="return-band">
        <img src={asset("/brand/pack-included.jpg")} alt="Фирменная упаковка RANIKA" />
        <div>
          <p className="kicker">Возврат</p>
          <h2>14 дней на обмен размера</h2>
          <p>
            Нужны бирки и гигиеническая накладка. Брак ткани или фурнитуры меняем и после этого срока.
          </p>
          <Link to="/sizes" className="btn ghost">
            Сверить мерки <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
