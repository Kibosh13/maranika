import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice, packs } from "../data";
import { useShop } from "../shop";

export default function Cart() {
  const shop = useShop();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!shop.cart.length) return;
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const city = String(data.get("city") || "").trim();
    const digits = phone.replace(/\D/g, "");
    if (name.length < 2 || digits.length < 10 || city.length < 2) {
      setError("Нужны имя, телефон и город — иначе заказ не соберём.");
      return;
    }
    setError("");
    const num = String(Math.floor(1000 + Math.random() * 9000));
    setOrder({
      num,
      name,
      phone,
      city,
      note: String(data.get("note") || "").trim(),
      pack: shop.pack.title,
      total: shop.total,
      lines: shop.cart.map((l) => `${l.product.name} · ${l.color.name} · ${l.size} × ${l.qty}`),
    });
    shop.clear();
  };

  if (order) {
    return (
      <section className="page-wrap narrow">
        <header className="page-head">
          <p className="kicker">Заказ {order.num}</p>
          <h1>Принято, {order.name.split(" ")[0]}</h1>
          <p className="lead">
            Сумма {formatPrice(order.total)}. Упаковка — {order.pack.toLowerCase()}. Мы свяжемся по
            телефону {order.phone} и подтвердим доставку в город {order.city}.
          </p>
        </header>
        <ul className="points">
          {order.lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <Link to="/catalog" className="btn ghost">
          Вернуться в коллекцию <span className="arrow">→</span>
        </Link>
      </section>
    );
  }

  return (
    <section className="page-wrap cart-page">
      <header className="page-head">
        <p className="kicker">Корзина</p>
        <h1>Ваш заказ</h1>
      </header>

      {shop.cart.length === 0 ? (
        <div className="empty-block">
          <p>Корзина пуста.</p>
          <Link to="/catalog" className="btn ghost">
            Смотреть коллекцию <span className="arrow">→</span>
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="cart-lines">
            {shop.cart.map((line) => (
              <li key={line.key}>
                <Link to={`/product/${line.product.id}`}>
                  <img src={line.product.image} alt="" />
                </Link>
                <div>
                  <h2>{line.product.name}</h2>
                  <p>
                    {line.color.name} · размер {line.size}
                  </p>
                  <div className="qty">
                    <button onClick={() => shop.setQty(line.key, Math.max(1, line.qty - 1))} aria-label="Меньше">
                      −
                    </button>
                    <span>{line.qty}</span>
                    <button onClick={() => shop.setQty(line.key, line.qty + 1)} aria-label="Больше">
                      +
                    </button>
                  </div>
                </div>
                <div className="line-end">
                  <strong>{formatPrice(line.product.price * line.qty)}</strong>
                  <button onClick={() => shop.remove(line.key)}>Убрать</button>
                </div>
              </li>
            ))}
          </ul>

          <form className="checkout" onSubmit={submit}>
            <fieldset>
              <legend>Упаковка</legend>
              <div className="pack-choice">
                {packs.map((pack) => (
                  <label key={pack.id} className={shop.packId === pack.id ? "on" : ""}>
                    <input
                      type="radio"
                      name="pack"
                      value={pack.id}
                      checked={shop.packId === pack.id}
                      onChange={() => shop.setPackId(pack.id)}
                    />
                    <img src={pack.image} alt="" />
                    <span>
                      <strong>{pack.title}</strong>
                      <em>{pack.price ? `+ ${formatPrice(pack.price)}` : "Включено"}</em>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label>
              Имя
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              Телефон
              <input name="phone" autoComplete="tel" inputMode="tel" required placeholder="+7" />
            </label>
            <label>
              Город
              <input name="city" autoComplete="address-level2" required />
            </label>
            <label>
              Комментарий
              <textarea name="note" rows={3} placeholder="Подъезд, удобное время, пожелание по посадке" />
            </label>

            <div className="totals">
              <p>
                <span>Вещи</span>
                <span>{formatPrice(shop.goods)}</span>
              </p>
              <p>
                <span>Упаковка</span>
                <span>{shop.pack.price ? formatPrice(shop.pack.price) : "0 ₽"}</span>
              </p>
              <p className="grand">
                <span>Итого</span>
                <span>{formatPrice(shop.total)}</span>
              </p>
              <p className="muted tiny">
                {shop.goods >= 15000
                  ? "Доставка по России в этом заказе без доплаты."
                  : `До бесплатной доставки ещё ${formatPrice(15000 - shop.goods)}.`}
              </p>
            </div>

            {error && <p className="form-error">{error}</p>}
            <button className="btn block" type="submit">
              Оформить заказ <span className="arrow">→</span>
            </button>
            <p className="tiny muted">Оплата согласуется с менеджером после подтверждения. Карту на сайте не списываем.</p>
          </form>
        </div>
      )}
    </section>
  );
}
