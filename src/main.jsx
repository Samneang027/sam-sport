import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import CartProvider from "./contexts/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/sam-sport">
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
);
