import { Link } from "react-router-dom";
import { asset } from "../data";

export default function Contacts() {
  return (
    <section className="page-wrap mood-page">
      <div className="contact-layout">
        <div>
          <p className="kicker">Контакты</p>
          <h1>На связи</h1>
          <p className="lead">
            После оформления заказа менеджер напишет сам — чтобы уточнить данные и способ доставки.
          </p>
          <Link to="/cart" className="btn ghost">
            Оформить заказ <span className="arrow">→</span>
          </Link>
          <nav className="contact-links" aria-label="Рядом">
            <Link to="/delivery">Доставка и возврат</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/about">О бренде</Link>
          </nav>
        </div>
        <figure>
          <img src={asset("/images/hero-coast.jpg")} alt="Берег RANIKA" />
          <figcaption>RANIKA — for every shape of beauty</figcaption>
        </figure>
      </div>
    </section>
  );
}
