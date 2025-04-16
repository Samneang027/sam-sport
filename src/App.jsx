import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Menu from "./components/menu";
import HomePage from "./pages/home-page";
import NikePage from "./pages/nike-page";
import PumaPage from "./pages/puma-page";
import AdidasPage from "./pages/adidas-page";
export default function MyApp() {
  return (
    <BrowserRouter basename="/sam-sport">
    <Menu/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/nike" element={<NikePage/>}/>
      <Route path="/puma" element={<PumaPage/>}/>
      <Route path="/adidas" element={<AdidasPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}
