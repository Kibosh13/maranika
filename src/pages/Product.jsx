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
  const slides = [
    ...product.images.map((src) => ({ type: "photo", src })),
    ...(product.category === "accessories" ? [] : [{ type: "care" }]),
  ];

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
        {slides[photo]?.type === "care" ? (
          <CareSlide />
        ) : (
          <img src={slides[photo].src} alt={`${product.name}, фото ${photo + 1}`} />
        )}
        <div className="thumbs">
          {slides.map((slide, i) => (
            <button
              key={slide.type === "care" ? "care" : slide.src}
              className={i === photo ? "on" : ""}
              onClick={() => setPhoto(i)}
              aria-label={slide.type === "care" ? "Рекомендации по уходу" : `Фото ${i + 1}`}
            >
              {slide.type === "care" ? <span className="care-thumb">Уход</span> : <img src={slide.src} alt="" />}
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

function CareSlide() {
  const steps = [
    { icon: "rinse", text: "Полощите в пресной воде после каждого ношения" },
    { icon: "hand", text: "Деликатная ручная стирка при 30°" },
    { icon: "dry", text: "Сушите естественно в тени" },
    { icon: "bleach", text: "Не используйте отбеливатель" },
    { icon: "tumble", text: "Не сушите в барабане" },
  ];

  return (
    <div className="care-slide">
      <div className="care-card">
        <p className="care-title">Уход с любовью</p>
        <ul>
          {steps.map((step) => (
            <li key={step.icon}>
              <CareIcon name={step.icon} />
              <span>{step.text}</span>
            </li>
          ))}
        </ul>
        <p className="care-foot">Премиальная итальянская ткань</p>
      </div>
    </div>
  );
}

function CareIcon({ name }) {
  const common = {
    viewBox: "0 0 32 32",
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4",
  };
  if (name === "rinse") {
    return (
      <svg {...common}>
        <path d="M5 13h22l-2 13H7L5 13z" />
        <path d="M11 13V9.5a5 5 0 0 1 10 0V13" />
      </svg>
    );
  }
  if (name === "hand") {
    return (
      <svg {...common}>
        <path d="M6 14h20l-1.6 12H7.6L6 14z" />
        <path d="M11 14c.5-3.2 2-5.2 5-5.2s4.5 2 5 5.2" />
        <path d="M13.5 19c.7 1.4 1.6 2 2.5 2s1.8-.6 2.5-2" />
      </svg>
    );
  }
  if (name === "dry") {
    return (
      <svg {...common}>
        <rect x="7" y="7" width="18" height="18" />
      </svg>
    );
  }
  if (name === "bleach") {
    return (
      <svg {...common}>
        <path d="M16 5l11 20H5L16 5z" />
        <path d="M7 8l18 18" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="5" y="9" width="22" height="15" rx="2" />
      <circle cx="16" cy="16.5" r="4" />
      <path d="M6 7l20 20" />
    </svg>
  );
}
