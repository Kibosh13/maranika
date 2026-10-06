export const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

export const categories = [
  {
    id: "new",
    title: "Новинки",
    image: "/images/look-cocoa.jpg",
    pos: "center 18%",
  },
  {
    id: "classic",
    title: "Классика",
    image: "/images/cat-classic.jpg",
    pos: "center",
  },
  {
    id: "color",
    title: "Яркие цвета",
    image: "/images/cat-color.jpg",
    pos: "center",
  },
  {
    id: "plus",
    title: "Большие размеры",
    image: "/images/cat-plus.jpg",
    pos: "center",
  },
  {
    id: "fabric",
    title: "Премиум ткани",
    image: "/images/detail-fabric.jpg",
    pos: "center",
    to: "/about#materials",
  },
  {
    id: "accessories",
    title: "Аксессуары",
    image: "/images/detail-hardware.jpg",
    pos: "center 40%",
  },
];

export const products = [
  {
    id: "triangle-ring",
    name: "Triangle Ring",
    ru: "Треугольник с кольцом",
    price: 6500,
    category: "new",
    isNew: true,
    support: true,
    image: "/images/prod-triangle.jpg",
    images: [
      "/images/prod-triangle.jpg",
      "/images/look-cocoa.jpg",
      "/images/detail-hardware.jpg",
      "/images/cat-new.jpg",
    ],
    colors: [
      { id: "cocoa", name: "Какао", hex: "#5A4034" },
      { id: "ivory", name: "Айвори", hex: "#F3EDE4" },
    ],
    photoColor: "Какао",
    lead: "Мягкий треугольник и кольцо в цвете шампанского. Посадка собирается завязками — от XS до 3XL.",
    points: [
      "Двойная подкладка чашки",
      "Регулируемые завязки на шее и спине",
      "Фурнитура золотистого тона",
      "Не просвечивает в мокром виде",
    ],
  },
  {
    id: "balconette",
    name: "Balconette",
    ru: "Балконет",
    price: 6900,
    category: "color",
    isNew: true,
    support: true,
    image: "/images/prod-balconette.jpg",
    images: ["/images/prod-balconette.jpg", "/images/cat-color.jpg", "/images/detail-fabric.jpg"],
    colors: [
      { id: "rose", name: "Малина", hex: "#A85B6C" },
      { id: "cocoa", name: "Какао", hex: "#5A4034" },
    ],
    photoColor: "Малина",
    lead: "Собранная чашка балконет держит форму и линию декольте. Плотная ткань, спокойная поддержка.",
    points: [
      "Формованная чашка с подкладом",
      "Широкая боковая поддержка",
      "Кольцо на поясе трусов",
      "Подходит как вечерний и пляжный силуэт",
    ],
  },
  {
    id: "twist-bandeau",
    name: "Twist Bandeau",
    ru: "Бандо с кольцом",
    price: 6900,
    category: "classic",
    support: false,
    image: "/images/prod-twist.jpg",
    images: ["/images/prod-twist.jpg", "/images/detail-fit.jpg", "/images/detail-hardware.jpg"],
    colors: [
      { id: "cocoa", name: "Какао", hex: "#5A4034" },
      { id: "black", name: "Чёрный", hex: "#1C1A19" },
    ],
    photoColor: "Какао",
    lead: "Бандо без бретелей: сборка уходит в кольцо. Для плеч, которые хочется оставить открытыми.",
    points: [
      "Силиконовая лента по верхнему краю",
      "Съёмные прозрачные бретели в комплекте",
      "Мягкая чашка без косточки",
      "Матовая ткань плотного плетения",
    ],
  },
  {
    id: "high-waist",
    name: "High Waist",
    ru: "Высокая посадка",
    price: 6900,
    category: "classic",
    support: true,
    image: "/images/prod-highwaist.jpg",
    images: ["/images/prod-highwaist.jpg", "/images/cat-classic.jpg", "/images/detail-fabric.jpg"],
    colors: [
      { id: "ivory", name: "Айвори", hex: "#F3EDE4" },
      { id: "blush", name: "Пудра", hex: "#E4C8C2" },
    ],
    photoColor: "Айвори",
    lead: "Высокая линия талии выравнивает силуэт и не пережимает. Классический треугольник сверху.",
    points: [
      "Посадка на талии, мягкая поддержка",
      "Двойная ткань в поясе",
      "Кольцо в центре верха",
      "Спокойный айвори, который не желтит у кожи",
    ],
  },
  {
    id: "tie-side",
    name: "Tie Side",
    ru: "На завязках",
    price: 5900,
    category: "classic",
    support: false,
    image: "/images/prod-tieside.jpg",
    images: ["/images/prod-tieside.jpg", "/images/look-noir.jpg", "/images/detail-fit.jpg"],
    colors: [
      { id: "black", name: "Чёрный", hex: "#1C1A19" },
      { id: "cocoa", name: "Какао", hex: "#5A4034" },
    ],
    photoColor: "Чёрный",
    lead: "Боковые завязки настраивают ширину бедра. Чёрный здесь матовый, без блеска.",
    points: [
      "Регулировка по бёдрам",
      "Минимальный треугольник",
      "Плотная подкладка",
      "Кольцо можно сместить к плечу",
    ],
  },
  {
    id: "sculpt-ring",
    name: "Sculpt Ring",
    ru: "Слитный с кольцом",
    price: 7900,
    category: "plus",
    support: true,
    image: "/images/prod-sculpt.jpg",
    images: ["/images/prod-sculpt.jpg", "/images/cat-plus.jpg", "/images/editorial-rack.jpg"],
    colors: [
      { id: "cocoa", name: "Какао", hex: "#5A4034" },
      { id: "black", name: "Чёрный", hex: "#1C1A19" },
    ],
    photoColor: "Какао",
    lead: "Слитная модель со сборкой в кольцо на талии. Держит грудь и рисует линию, не сплющивая её.",
    points: [
      "Усиленные бретели",
      "Внутренняя поддержка чашки",
      "Кольцо фиксирует драпировку",
      "Свободная градация до 3XL",
    ],
  },
  {
    id: "shore-shirt",
    name: "Shore Shirt",
    ru: "Рубашка-накидка",
    price: 4500,
    category: "accessories",
    support: false,
    image: "/images/prod-cover.jpg",
    images: ["/images/prod-cover.jpg", "/images/detail-fabric.jpg"],
    colors: [
      { id: "ivory", name: "Айвори", hex: "#F4EFE6" },
      { id: "sand", name: "Песок", hex: "#D9C7AE" },
    ],
    photoColor: "Айвори",
    lead: "Лёгкая накидка поверх купальника. Тот же оттенок айвори, что и в упаковке.",
    points: [
      "Свободный крой",
      "Дышащая ткань",
      "Носится открытой или узлом",
      "Один размерный ряд, садится свободно",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  },
];

export const packs = [
  {
    id: "budget",
    title: "Бюджет",
    price: 0,
    image: "/brand/pack-budget.jpg",
    kicker: "Входит в заказ",
    text: "Плотный пакет, калька с золотым контуром, матовый зип-пакет, конверт и бирка. Тот же знак, без лишнего объёма.",
  },
  {
    id: "premium",
    title: "Премиум",
    price: 690,
    image: "/brand/pack-premium.jpg",
    kicker: "Ритуал",
    text: "Жёсткая коробка, хлопковый мешок на лентах, сургуч, открытка и две бирки. Упаковку хочется оставить.",
  },
];

export const virtues = [
  {
    title: "Премиальная фурнитура",
    image: "/images/detail-hardware.jpg",
    to: "/about#materials",
  },
  {
    title: "Качественные ткани",
    image: "/images/detail-fabric.jpg",
    to: "/about#materials",
  },
  {
    title: "Идеальная посадка",
    image: "/images/detail-fit.jpg",
    to: "/sizes",
  },
  {
    title: "Эстетичная упаковка",
    image: "/brand/pack-premium.jpg",
    to: "/packaging",
  },
];

export const sizeChart = [
  { size: "XS", bust: "78–82", waist: "60–64", hip: "86–90" },
  { size: "S", bust: "82–86", waist: "64–68", hip: "90–94" },
  { size: "M", bust: "86–92", waist: "68–74", hip: "94–100" },
  { size: "L", bust: "92–98", waist: "74–80", hip: "100–106" },
  { size: "XL", bust: "98–106", waist: "80–88", hip: "106–114" },
  { size: "2XL", bust: "106–114", waist: "88–96", hip: "114–122" },
  { size: "3XL", bust: "114–122", waist: "96–106", hip: "122–132" },
];

export function formatPrice(n) {
  return new Intl.NumberFormat("ru-RU").format(n) + "\u00A0₽";
}

export function getProduct(id) {
  return products.find((p) => p.id === id);
}

export function filterProducts(list, category) {
  if (!category || category === "all") return list;
  if (category === "plus") return list.filter((p) => p.support);
  if (category === "swim") return list.filter((p) => p.category !== "accessories");
  if (category === "fabric") return list;
  return list.filter((p) => p.category === category);
}
