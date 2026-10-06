import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatPrice, getProduct, products, SIZES } from "../data";
import { useShop } from "../shop";
import { ProductCard } from "./Catalog";

export default function Product() {
  const { id } = useParams();
  const product = getProduct(id);
  const shop = useShop();
  const [photo, setPhoto] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product?.colors?.[0]?.id || "");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    setPhoto(0);
    setSize("");
    setQty(1);
    setError("");
    setColor(product?.colors?.[0]?.id || "");
  }, [id]);

  if (!product) {
    return (
      <section className="page-wrap">
        <h1>Модель не найдена</h1>
        <Link to="/catalog" className="btn ghost">
          В коллекцию
        </Link>
      </section>
    );
  }

  const sizes = product.sizes || SIZES;
  const loved = shop.wish.includes(product.id);

  const add = () => {
    if (!size) {
      setError("Выберите размер — от XS до 3XL.");
      return;
    }
    setError("");
    shop.add({ id: product.id, size, color, qty });
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <article className="pdp">
      <div className="pdp-gallery">
        <img src={product.images[photo]} alt={`${product.name}, фото ${photo + 1}`} />
        <div className="thumbs">
          {product.images.map((src, i) => (
            <button key={src} className={i === photo ? "on" : ""} onClick={() => setPhoto(i)}>
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      </div>

      <div className="pdp-info">
        <p className="kicker">{product.ru}</p>
        <h1>{product.name}</h1>
        <p className="price">{formatPrice(product.price)}</p>
        <p className="lead">{product.lead}</p>

        <fieldset>
          <legend>
            Цвет <span>на фото — {product.photoColor}</span>
          </legend>
          <div className="choice">
            {product.colors.map((c) => (
              <button
                key={c.id}
                className={`swatch ${color === c.id ? "on" : ""}`}
                style={{ background: c.hex }}
                aria-label={c.name}
                aria-pressed={color === c.id}
                onClick={() => setColor(c.id)}
              />
            ))}
            <em>{product.colors.find((c) => c.id === color)?.name}</em>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            Размер <Link to="/sizes">Таблица</Link>
          </legend>
          <div className="choice sizes">
            {sizes.map((s) => (
              <button
                key={s}
                className={size === s ? "on" : ""}
                aria-pressed={size === s}
                onClick={() => {
                  setSize(s);
                  setError("");
                }}
              >
                {s}
              </button>
            ))}
          </div>
          {error && <p className="form-error">{error}</p>}
        </fieldset>

        <div className="buy">
          <div className="qty" aria-label="Количество">
            <button onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="Меньше">
              −
            </button>
            <span>{qty}</span>
            <button onClick={() => setQty((n) => Math.min(5, n + 1))} aria-label="Больше">
              +
            </button>
          </div>
          <button className="btn block" onClick={add}>
            В корзину <span className="arrow">→</span>
          </button>
          <button
            className={`wish lone ${loved ? "on" : ""}`}
            aria-pressed={loved}
            onClick={() => shop.toggleWish(product.id)}
          >
            {loved ? "В избранном" : "В избранное"}
          </button>
        </div>

        <ul className="points">
          {product.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <p className="care">
          Ручная стирка в прохладной воде, без отжима. Кольцо не любит хлор и морскую соль надолго —
          ополосните после моря. Упаковку — бюджет или премиум — выбираете в корзине.
        </p>
      </div>

      <section className="related">
        <div className="sec-head">
          <h2>Рядом в коллекции</h2>
          <Link to="/catalog">
            Все модели <span className="arrow">→</span>
          </Link>
        </div>
        <div className="pcards">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </article>
  );
}
