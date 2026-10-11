import { useState } from "react";
import { Link } from "react-router-dom";

const items = [
  {
    q: "Как оплачивается доставка?",
    a: "При получении или при оформлении заказа. Карту на сайте не списываем.",
  },
  {
    q: "Сколько собирается заказ?",
    a: "Срок в пути не включает сборку. Обычно это 1–3 рабочих дня, если вещь есть на складе.",
  },
  {
    q: "Что происходит после оформления?",
    a: "Менеджер свяжется с вами, чтобы уточнить данные и способ доставки.",
  },
  {
    q: "Можно ли вернуть или обменять?",
    a: "Размер можно обменять в течение 14 дней, если сохранены бирки и гигиеническая накладка. Брак ткани или фурнитуры меняем и позже.",
  },
  {
    q: "Какая упаковка приходит с заказом?",
    a: "Фирменная упаковка — в каждом заказе. Премиум с коробкой и хлопковым мешком можно добавить отдельно.",
  },
  {
    q: "Как ухаживать за купальником?",
    a: "Полоскать в пресной воде после ношения, стирать вручную при 30° и сушить в тени. Без отбеливателя и без барабана.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="page-wrap mood-page">
      <header className="faq-head">
        <div>
          <p className="kicker">FAQ</p>
          <h1>Вопросы</h1>
        </div>
        <p className="lead">Коротко о доставке, посадке и уходе. Остальное уточнит менеджер.</p>
      </header>

      <div className="faq-list">
        {items.map((item, index) => {
          const on = open === index;
          return (
            <article key={item.q} className={on ? "on" : ""}>
              <button
                aria-expanded={on}
                onClick={() => setOpen(on ? -1 : index)}
              >
                <span>{item.q}</span>
                <i aria-hidden="true" />
              </button>
              <div className="faq-panel">
                <p>{item.a}</p>
              </div>
            </article>
          );
        })}
      </div>

      <p className="center-cta">
        <Link to="/delivery" className="btn ghost">
          Доставка и возврат <span className="arrow">→</span>
        </Link>
      </p>
    </section>
  );
}
