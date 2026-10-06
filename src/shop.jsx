import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, packs } from "./data";

const KEY = "maranika-v1";
const ShopContext = createContext(null);

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function ShopProvider({ children }) {
  const saved = read();
  const [cart, setCart] = useState(saved?.cart || []);
  const [wish, setWish] = useState(saved?.wish || []);
  const [packId, setPackId] = useState(saved?.packId || "budget");
  const [drawer, setDrawer] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ cart, wish, packId }));
  }, [cart, wish, packId]);

  const api = useMemo(() => {
    const add = (item) => {
      setCart((prev) => {
        const i = prev.findIndex(
          (p) => p.id === item.id && p.size === item.size && p.color === item.color
        );
        if (i >= 0) {
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + (item.qty || 1) };
          return next;
        }
        return [...prev, { ...item, qty: item.qty || 1 }];
      });
      setDrawer(true);
    };

    const setQty = (key, qty) => {
      setCart((prev) =>
        prev
          .map((p) => (lineKey(p) === key ? { ...p, qty } : p))
          .filter((p) => p.qty > 0)
      );
    };

    const remove = (key) => setCart((prev) => prev.filter((p) => lineKey(p) !== key));

    const toggleWish = (id) =>
      setWish((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

    const clear = () => setCart([]);

    const lines = cart
      .map((line) => {
        const product = getProduct(line.id);
        if (!product) return null;
        const color = product.colors.find((c) => c.id === line.color) || product.colors[0];
        return { ...line, product, color, key: lineKey(line) };
      })
      .filter(Boolean);

    const pack = packs.find((p) => p.id === packId) || packs[0];
    const goods = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);

    return {
      cart: lines,
      wish,
      pack,
      packId,
      setPackId,
      goods,
      total: goods + (lines.length ? pack.price : 0),
      count,
      drawer,
      setDrawer,
      searchOpen,
      setSearchOpen,
      add,
      setQty,
      remove,
      toggleWish,
      clear,
    };
  }, [cart, wish, packId, drawer, searchOpen]);

  return <ShopContext.Provider value={api}>{children}</ShopContext.Provider>;
}

export function lineKey(line) {
  return `${line.id}-${line.size}-${line.color}`;
}

export function useShop() {
  return useContext(ShopContext);
}
