import { Link } from "react-router-dom";

export default function Delivery() {
  return (
    <section className="page-wrap">
      <header className="about-top">
        <div>
          <p className="kicker">Доставка</p>
          <h1>Тихо и в срок</h1>
        </div>
        <p className="lead">
          Отправляем по России. Заказ собирается в выбранной упаковке и уезжает после подтверждения.
        </p>
      </header>

      <div className="steps">
        <article>
          <span>01</span>
          <h2>Москва и область</h2>
          <p>1–2 дня, курьер до двери. При заказе от 15&nbsp;000&nbsp;₽ — без доплаты за доставку.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Города</h2>
          <p>2–5 дней в пункт выдачи или до двери. Срок называем при подтверждении заказа.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Дальше</h2>
          <p>3–7 дней. Упаковку не сжимаем: премиум-коробка едет как есть.</p>
        </article>
      </div>

      <div className="about-story">
        <article>
          <p className="kicker">14 дней</p>
          <h2>Обмен размера</h2>
          <p>
            Нужны бирки и гигиеническая накладка. Купальник с нарушенной защитой обратно не принимаем —
            это правило для всего ряда, включая большие размеры.
          </p>
        </article>
        <article>
          <p className="kicker">Без срока</p>
          <h2>Брак</h2>
          <p>
            Если вещь с браком ткани или фурнитуры, меняем её и после 14 дней. Напишите об этом в
            комментарии к заказу или ответом на письмо с подтверждением.
          </p>
        </article>
        <article>
          <p className="kicker">До заказа</p>
          <h2>Сначала мерки</h2>
          <p>Если мерки на соседних размерах, берите больший: ткань почти не тянется «в запас».</p>
          <Link to="/sizes" className="btn ghost">
            Сверить мерки <span className="arrow">→</span>
          </Link>
        </article>
      </div>
    </section>
  );
}
