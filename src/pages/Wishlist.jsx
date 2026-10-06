import { Link } from "react-router-dom";
import { products } from "../data";
import { useShop } from "../shop";
import { ProductCard } from "./Catalog";

export default function Wishlist() {
  const shop = useShop();
  const list = products.filter((p) => shop.wish.includes(p.id));

  return (
    <section className="catalog">
      <header className="page-head">
        <p className="kicker">Избранное</p>
        <h1>Сохранённое</h1>
      </header>
      {list.length === 0 ? (
        <div className="empty-block">
          <p>Пока ничего не отмечено.</p>
          <Link to="/catalog" className="btn ghost">
            В коллекцию <span className="arrow">→</span>
          </Link>
        </div>
      ) : (
        <div className="pcards">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
