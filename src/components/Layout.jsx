import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { formatPrice, products, asset } from "../data";
import { useShop } from "../shop";

const NAV = [
  { to: "/catalog", label: "Коллекции" },
  { to: "/catalog/swim", label: "Купальники" },
  { to: "/sizes", label: "Большие размеры" },
  { to: "/about", label: "О бренде" },
  { to: "/delivery", label: "Доставка" },
];

export default function Layout({ children }) {
  const shop = useShop();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  const [booting, setBooting] = useState(() => !sessionStorage.getItem("ranika-in"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
    shop.setSearchOpen(false);
    shop.setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    if (!booting) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("ranika-in", "1");
      setBooting(false);
    }, 1700);
    return () => clearTimeout(t);
  }, [booting]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenu(false);
        shop.setSearchOpen(false);
        shop.setDrawer(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shop]);

  useEffect(() => {
    if (shop.searchOpen) searchRef.current?.focus();
  }, [shop.searchOpen]);

  useEffect(() => {
    const lock = menu || shop.drawer || shop.searchOpen;
    document.body.classList.toggle("lock", lock);
  }, [menu, shop.drawer, shop.searchOpen]);

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [pathname]);

  const onHero = pathname === "/" && !scrolled && !menu;
  const found = query.trim()
    ? products.filter((p) =>
        (p.name + p.ru + p.lead).toLowerCase().includes(query.trim().toLowerCase())
      )
    : products.slice(0, 4);

  const submitSearch = (e) => {
    e?.preventDefault();
    shop.setSearchOpen(false);
    navigate(query.trim() ? `/catalog?q=${encodeURIComponent(query.trim())}` : "/catalog");
  };

  return (
    <>
      {booting && (
        <div className="preloader" aria-hidden="true">
          <img className="preloader-field" src={asset("/brand/logo.png")} alt="" />
          <img className="preloader-mark" src={asset("/brand/logo.png")} alt="" />
        </div>
      )}

      <header className={`site-header ${onHero ? "on-hero" : "solid"}`}>
        <nav className="nav" aria-label="Основное меню">
          {NAV.map((item) => (
            <NavLink end={item.to === "/catalog"} key={item.label} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="burger"
          aria-label={menu ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menu}
          onClick={() => setMenu((v) => !v)}
        >
          <span />
          <span />
        </button>

        <Link to="/" className="brand" aria-label="RANIKA, на главную">
          <span className="brand-name">Ranika</span>
          <span className="brand-sub">Swimwear</span>
        </Link>

        <div className="tools">
          <button className="icon-btn" aria-label="Поиск" onClick={() => shop.setSearchOpen(true)}>
            <SearchIcon />
          </button>
          <Link to="/wishlist" className="icon-btn" aria-label="Избранное">
            <HeartIcon />
            {shop.wish.length > 0 && <em className="badge">{shop.wish.length}</em>}
          </Link>
          <button className="icon-btn" aria-label="Корзина" onClick={() => shop.setDrawer(true)}>
            <BagIcon />
            {shop.count > 0 && (
              <em className="badge" key={shop.count}>
                {shop.count}
              </em>
            )}
          </button>
          <span className="lang">RU</span>
        </div>
      </header>

      <div className={`menu ${menu ? "open" : ""}`}>
        {NAV.map((item) => (
          <Link key={item.label} to={item.to} onClick={() => setMenu(false)}>
            {item.label}
          </Link>
        ))}
        <Link to="/packaging" onClick={() => setMenu(false)}>
          Упаковка
        </Link>
      </div>

      <div className={`drawer ${shop.drawer ? "open" : ""}`} role="dialog" aria-label="Корзина">
        <div className="drawer-head">
          <p>Корзина</p>
          <button onClick={() => shop.setDrawer(false)} aria-label="Закрыть корзину">
            Закрыть
          </button>
        </div>
        {shop.cart.length === 0 ? (
          <p className="muted drawer-empty">Пока пусто. Коллекция ждёт на главной.</p>
        ) : (
          <ul className="drawer-list">
            {shop.cart.map((line) => (
              <li key={line.key}>
                <img src={line.product.image} alt="" />
                <div>
                  <strong>{line.product.name}</strong>
                  <span>
                    {line.color.name} · {line.size} · {line.qty}
                  </span>
                  <span>{formatPrice(line.product.price * line.qty)}</span>
                </div>
                <button onClick={() => shop.remove(line.key)} aria-label="Убрать">
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="drawer-foot">
          <p>
            <span>Сумма</span>
            <span>{formatPrice(shop.goods)}</span>
          </p>
          <Link to="/cart" className="btn block" onClick={() => shop.setDrawer(false)}>
            Оформить <span className="arrow">→</span>
          </Link>
        </div>
      </div>
      {shop.drawer && <button className="shade" aria-label="Закрыть" onClick={() => shop.setDrawer(false)} />}

      <div className={`search ${shop.searchOpen ? "open" : ""}`} role="dialog" aria-label="Поиск">
        <form onSubmit={submitSearch}>
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Модель, цвет, посадка"
            aria-label="Поиск по коллекции"
          />
          <button type="submit" className="btn">
            Найти
          </button>
        </form>
        <div className="search-list">
          {found.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} onClick={() => shop.setSearchOpen(false)}>
              <img src={p.image} alt="" />
              <span>
                <strong>{p.name}</strong>
                <em>{p.ru}</em>
              </span>
              <b>{formatPrice(p.price)}</b>
            </Link>
          ))}
          {found.length === 0 && <p className="muted">Ничего не нашли. Попробуйте «кольцо» или «бандо».</p>}
        </div>
        <button className="search-close" onClick={() => shop.setSearchOpen(false)}>
          Закрыть
        </button>
      </div>

      <main className="page" key={pathname}>
        {children}
      </main>
      <Footer />
    </>
  );
}

function Footer() {
  const [done, setDone] = useState(false);
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="kicker">Дом</p>
          <Link to="/about">О бренде</Link>
          <Link to="/sizes">Размеры XS–3XL</Link>
          <Link to="/packaging">Упаковка</Link>
          <Link to="/delivery">Доставка</Link>
        </div>
        <div>
          <p className="kicker">Коллекция</p>
          <Link to="/catalog/new">Новинки</Link>
          <Link to="/catalog/classic">Классика</Link>
          <Link to="/catalog/color">Яркие цвета</Link>
          <Link to="/catalog/plus">Поддержка</Link>
        </div>
        <form
          className="news"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <p className="kicker">Письма дома</p>
          <p>Редкие письма о новых посадках. Без лишней почты.</p>
          {done ? (
            <p className="news-ok">Адрес записан. До скорой коллекции.</p>
          ) : (
            <label>
              <span className="sr">Электронная почта</span>
              <input type="email" required placeholder="Почта" />
              <button type="submit" aria-label="Подписаться">
                →
              </button>
            </label>
          )}
        </form>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} RANIKA</span>
        <span>For every shape of beauty</span>
      </div>
    </footer>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l4 4" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 19s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </svg>
  );
}
