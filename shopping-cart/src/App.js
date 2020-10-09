import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { Products } from "./features/products/Products";
import { Cart } from "./features/cart/Cart";
import "./App.css";

function App() {
  return (
    <div>
      <Cart />
      <Products />
    </div>
  );
}

export default App;
