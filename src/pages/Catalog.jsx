import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { categories, filterProducts, formatPrice, products } from "../data";
import { useShop } from "../shop";

export default function Catalog() {
  const { category = "all" } = useParams();
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim().toLowerCase();
  const [sort, setSort] = useState("featured");

  const title =
    category === "plus"
      ? "С поддержкой"
      : category === "swim"
        ? "Купальники"
        : categories.find((c) => c.id === category)?.title || "Коллекция";

  const list = useMemo(() => {
    let next = filterProducts(products, category);
    if (q) {
      next = next.filter((p) => (p.name + p.ru + p.lead).toLowerCase().includes(q));
    }
    if (sort === "asc") next = [...next].sort((a, b) => a.price - b.price);
    if (sort === "desc") next = [...next].sort((a, b) => b.price - a.price);
    return next;
  }, [category, q, sort]);

  return (
    <section className="catalog">
      <header className="page-head">
        <p className="kicker">{q ? `Поиск «${params.get("q")}»` : "RANIKA"}</p>
        <h1>{title}</h1>
        <p className="lead">Строгий крой, тёплая палитра, размеры от XS до 3XL.</p>
      </header>

      <div className="filters">
        <div className="chips">
          <Link className={category === "all" ? "on" : ""} to="/catalog">
            Все
          </Link>
          {categories
            .filter((c) => c.id !== "fabric")
            .map((c) => (
              <Link key={c.id} className={category === c.id ? "on" : ""} to={`/catalog/${c.id}`}>
                {c.title}
              </Link>
            ))}
        </div>
        <label className="sort">
          <span>Порядок</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Сортировка">
            <option value="featured">Как в доме</option>
            <option value="asc">Сначала спокойнее по цене</option>
            <option value="desc">Сначала выше по цене</option>
          </select>
        </label>
      </div>

      {list.length === 0 ? (
        <p className="empty">В этом разделе пока тихо. Посмотрите всю коллекцию.</p>
      ) : (
        <div className="pcards">
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 50} />
          ))}
        </div>
      )}
    </section>
  );
}

export function ProductCard({ product, delay = 0 }) {
  const shop = useShop();
  const loved = shop.wish.includes(product.id);
  return (
    <article className="pcard reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div className="pcard-media">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={`${product.name} — ${product.ru}`} />
        </Link>
        {product.isNew && <em className="flag">New</em>}
        <button
          className={`wish ${loved ? "on" : ""}`}
          aria-label={loved ? "Убрать из избранного" : "В избранное"}
          aria-pressed={loved}
          onClick={() => shop.toggleWish(product.id)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 19s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" />
          </svg>
        </button>
      </div>
      <div className="pcard-meta">
        <h3>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p>{product.ru}</p>
        <div className="pcard-row">
          <strong>{formatPrice(product.price)}</strong>
          <span className="dots" aria-hidden="true">
            {product.colors.map((c) => (
              <i key={c.id} style={{ background: c.hex }} />
            ))}
          </span>
        </div>
      </div>
    </article>
  );
}
