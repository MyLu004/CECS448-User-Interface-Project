"use client";
import { createContext } from "react";

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

// default no-op setter prevents undefined checks in consumers
export const ShoppingCartContext = createContext<ShoppingCartCtx>({
  shoppingCart: [],
  setShoppingCart: () => {},
});