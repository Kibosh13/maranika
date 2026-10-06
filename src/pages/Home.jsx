import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { categories, products, virtues, asset } from "../data";
import { ProductCard } from "./Catalog";

const slides = [
  {
    image: asset("/images/hero-01.jpg"),
    tone: "light",
    kicker: "New Collection",
    title: "Maranika",
    sub: "Swimwear",
    lead: "Красота в каждой форме\nдля твоей уникальной истории",
    cta: "Смотреть коллекцию",
    to: "/catalog",
  },
  {
    image: asset("/images/hero-coast.jpg"),
    tone: "light",
    kicker: "О бренде",
    title: "Философия",
    sub: "For every shape",
    lead: "Разные формы.\nОдна красота.",
    cta: "Наша философия",
    to: "/about",
  },
  {
    image: asset("/images/editorial-rack.jpg"),
    tone: "dark",
    kicker: "The Edit",
    title: "Линия",
    sub: "XS — 3XL",
    lead: "Семь размеров.\nОдна и та же строгость кроя.",
    cta: "Подобрать размер",
    to: "/sizes",
  },
];

const LINE = ["Sun", "Body", "Freedom", "You", "For every shape of beauty", "XS — 3XL"];

function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const seq = track?.querySelector(".marquee-seq");
    if (!track || !seq) return;

    const fit = () => {
      track.style.setProperty("--shift", `${seq.offsetWidth}px`);
      track.style.animationDuration = `${seq.offsetWidth / 42}s`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(seq);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        {[0, 1].map((copy) => (
          <div className="marquee-seq" key={copy}>
            {Array.from({ length: 6 }).map((_, set) =>
              LINE.map((word) => (
                <span key={`${copy}-${set}-${word}`}>{word}</span>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  useEffect(() => {
    document.body.dataset.tone = slide.tone;
  }, [slide.tone]);

  useEffect(() => {
    const t = setInterval(() => setIndex((n) => (n + 1) % slides.length), 7000);
    return () => {
      clearInterval(t);
      document.body.dataset.tone = "light";
    };
  }, []);

  return (
    <>
      <section className={`hero ${slide.tone === "dark" ? "dark-slide" : ""}`}>
        {slides.map((s, i) => (
          <div className={`hero-slide ${i === index ? "on" : ""}`} key={s.image}>
            <img src={s.image} alt="" />
          </div>
        ))}
        <div className="hero-shade" />
        <div className={`hero-copy ${slide.tone}`} key={slide.title}>
          <p className="kicker">{slide.kicker}</p>
          <h1>{slide.title}</h1>
          <p className="hero-sub">{slide.sub}</p>
          <p className="hero-lead">{slide.lead}</p>
          <Link to={slide.to} className={`btn ${slide.tone === "dark" ? "ghost" : "light"}`}>
            {slide.cta} <span className="arrow">→</span>
          </Link>
        </div>
        <div className="hero-meta">
          <span className="hero-count">
            0{index + 1}
            <i key={index} />
            0{slides.length}
          </span>
          <span className="hero-words">Sun / Body / Freedom / You</span>
        </div>
      </section>

      <section className="stories" aria-label="Разделы">
        <div className="stories-track">
          {categories.map((c) => (
            <Link key={c.id} to={c.to || `/catalog/${c.id}`} className="story">
              <span className="story-ring">
                <span>
                  <img src={c.image} alt="" style={{ objectPosition: c.pos }} />
                </span>
              </span>
              <span className="story-label">{c.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <Marquee />

      <section className="band">
        <div className="sec-head reveal">
          <div>
            <p className="kicker">Кампания</p>
            <h2>Популярные модели</h2>
          </div>
          <Link to="/catalog">
            Смотреть все <span className="arrow">→</span>
          </Link>
        </div>
        <div className="pcards">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 70} />
          ))}
        </div>
      </section>

      <section className="shape">
        <div className="shape-copy reveal">
          <p className="kicker">Размерный ряд</p>
          <h2>
            Купальники
            <br />
            на любую фигуру
          </h2>
          <p className="lead">Размеры от XS до 3XL</p>
          <div className="size-row">
            {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((s) => (
              <Link key={s} to="/sizes">
                {s}
              </Link>
            ))}
          </div>
          <Link to="/sizes" className="btn ghost">
            Подобрать свой размер <span className="arrow">→</span>
          </Link>
        </div>
        <div className="shape-photo">
          <img src={asset("/images/hero-01.jpg")} alt="Кампания MARANIKA на скалах у моря" />
        </div>
        <div className="shape-note reveal">
          <p className="kicker">Философия</p>
          <h2>
            Разные формы.
            <br />
            Одна красота.
          </h2>
          <p>
            Мы создаём купальники, в которых каждая девушка чувствует себя уверенно и желанной.
            Крой начинается с фигуры, а не с усреднённого лекала.
          </p>
          <Link to="/about" className="btn ghost">
            Наша философия <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <section className="virtues">
        {virtues.map((v) => (
          <Link key={v.title} to={v.to} className="virtue">
            <img src={v.image} alt="" />
            <span>
              {v.title}
              <em>Смотреть →</em>
            </span>
          </Link>
        ))}
      </section>

      <section className="packs">
        <div className="sec-head reveal">
          <div>
            <p className="kicker">Упаковка</p>
            <h2>
              Две линии.
              <br />
              Одна эстетика.
            </h2>
          </div>
          <Link to="/packaging">
            Подробнее <span className="arrow">→</span>
          </Link>
        </div>
        <div className="pack-grid">
          <article className="reveal">
            <img src={asset("/brand/pack-budget.jpg")} alt="Бюджетная упаковка MARANIKA: пакет, калька, зип-пакет и бирка" />
            <div>
              <p className="kicker">01 — входит в заказ</p>
              <h3>Бюджет</h3>
              <p>
                Плотный пакет, калька с золотым контуром, матовый зип-пакет, конверт и бирка. Тихо и
                достаточно.
              </p>
            </div>
          </article>
          <article className="reveal">
            <img
              src={asset("/brand/pack-premium.jpg")}
              alt="Премиум-упаковка MARANIKA: коробка, хлопковый мешок, сургуч и открытка"
            />
            <div>
              <p className="kicker">02 — ритуал +690 ₽</p>
              <h3>Премиум</h3>
              <p>
                Жёсткая коробка, хлопковый мешок на лентах, сургуч, открытка и две бирки. Её оставляют
                на полке.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="edit">
        <article>
          <img src={asset("/images/hero-coast.jpg")} alt="" style={{ objectPosition: "center 62%" }} />
          <div>
            <p className="kicker">More than swimwear</p>
            <h2>Не только берег</h2>
          </div>
        </article>
        <article className="edit-plain">
          <img
            src={asset("/images/editorial-rack.jpg")}
            alt="Купальники MARANIKA на латунной рейке"
            style={{ objectPosition: "center center" }}
          />
        </article>
        <article>
          <img src={asset("/images/look-noir.jpg")} alt="" style={{ objectPosition: "center 18%" }} />
          <div>
            <p className="kicker">State of mind</p>
            <h2>Точная посадка</h2>
          </div>
        </article>
      </section>
    </>
  );
}
