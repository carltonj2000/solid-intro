import { createSignal, createResource } from "solid-js";
import { createMutable } from "solid-js/store";

import { Product } from "./components/Header";

export const [search, searchSet] = createSignal("");
export const onSetSearch = (s: string) => searchSet(s);

export const cart = createMutable({
  products: JSON.parse(
    window.localStorage.getItem("cart") || "[]"
  ) as Product[],
  get total() {
    return this.products.reduce((acc, p) => acc + p.price, 0);
  },
  addToCart(p: Product) {
    this.products.push(p);
    window.localStorage.setItem("cart", JSON.stringify(this.products));
  },
  clearCart() {
    this.products = [];
    window.localStorage.setItem("cart", JSON.stringify(this.products));
  },
});

export const [products] = createResource<Product[]>(
  () => fetch("http://fakestoreapi.com/products").then((res) => res.json()),
  { initialValue: [] }
);
