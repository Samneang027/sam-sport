import React, { useEffect , useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/menu";
import HomePage from "./pages/home-page";
import NikePage from "./pages/nike-page";
import PumaPage from "./pages/puma-page";
import AdidasPage from "./pages/adidas-page";
import ProductDetailPage from "./pages/product-detail-page";
import OrderListPage from "./pages/order-list-page";
export default function App() {
  return (
    <Routes >
      <Route  path="/" element={<HomePage />} />
      <Route path="/nike" element={<NikePage />} />
      <Route path="/puma" element={<PumaPage />} />
      <Route path="/adidas" element={<AdidasPage />} />
      <Route path="/product/:uuid" element={<ProductDetailPage/>}/>
      <Route path="/cart" element={<OrderListPage/>}/>
    </Routes>
  );
}
