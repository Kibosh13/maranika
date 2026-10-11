import { Link } from "react-router-dom";

export default function Contacts() {
  return (
    <section className="page-wrap quiet">
      <header className="page-head">
        <p className="kicker">Контакты</p>
        <h1>На связи</h1>
        <p className="lead">
          После оформления заказа менеджер свяжется с вами, чтобы уточнить данные и способ доставки.
        </p>
      </header>
      <p className="center-cta">
        <Link to="/cart" className="btn ghost">
          Оформить заказ <span className="arrow">→</span>
        </Link>
      </p>
    </section>
  );
}
