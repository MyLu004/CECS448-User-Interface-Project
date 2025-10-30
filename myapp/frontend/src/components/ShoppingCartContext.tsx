"use client";
import { createContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  name: string;
  class: string;
  section: string;
  times: string;
  room: string;
  instructor: string;
  dates: string;
  status: boolean;
  units: number;
};

type ShoppingCartCtx = {
  shoppingCart: CartItem[];
  setShoppingCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export const ShoppingCartContext = createContext<ShoppingCartCtx>({
  shoppingCart: [],
  setShoppingCart: () => {},
});

// ✅ Provider that owns the state + localStorage sync
export function ShoppingCartProvider({ children }: { children: React.ReactNode }) {
  const [shoppingCart, setShoppingCart] = useState<CartItem[]>(() => {
    // lazy init so we don’t flash empty before hydration
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("shoppingCart");
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  // load on first mount (defensive if you remove the lazy init later)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("shoppingCart");
      if (raw) setShoppingCart(JSON.parse(raw) as CartItem[]);
    } catch {}
  }, []);

  // save on every change
  useEffect(() => {
    try {
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    } catch {}
  }, [shoppingCart]);

  const value = useMemo(() => ({ shoppingCart, setShoppingCart }), [shoppingCart]);

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
