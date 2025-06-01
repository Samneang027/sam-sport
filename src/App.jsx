import React, { useEffect , useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/menu";
import HomePage from "./pages/home-page";
import NikePage from "./pages/nike-page";
import PumaPage from "./pages/puma-page";
import AdidasPage from "./pages/adidas-page";
import ProductDetailPage from "./pages/product-detail-page";
import OrderListPage from "./pages/order-list-page";
import SignInPage from "./pages/sign-in-page";
import LoginPage from "./pages/login-page";
import LoginCartPage from "./pages/login-cart-page";
import UserListPage from "./pages/user-list-page";
import AdminRoute from "./components/admin-route";
import AdminDashboard from "./pages/admin-dashboard-page";
import UserRoute from "./components/user-route";
import UserDashboard from "./pages/user-dashboard-page";
import SupplierPage from "./pages/supplier-page";
import SupplierListPage from "./pages/supplier-list-page";
import BrandPage from "./pages/brand-page";
import BrandListPage from "./pages/brand-list-page";
import CategoryPage from "./pages/category-page";
import CategoryListPage from "./pages/category-list-page";
import ProductPage from "./pages/product-page";
import ProductListPage from "./pages/product-list-page";
import UnauthorizedPage from "./pages/unauthorized-page";
import LogoutPage from "./pages/logout-page";
import UserPage from "./pages/user-page";
import InvoicePage from "./pages/invoice-page";
import PaymentListPage from './pages/payment-list-page';
export default function App() {
  return (
    <Routes>
      <Route  path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage/>}/>
      <Route path="/login-cart" element={<LoginCartPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      {/* User Dashboard Routes */}
      <Route path="/user-dashboard" element={<UserRoute><UserDashboard/></UserRoute>}>
        <Route path="" element={<HomePage />} />
        <Route path="nike" element={<NikePage />} />
        <Route path="puma" element={<PumaPage />} />
        <Route path="adidas" element={<AdidasPage />} />
        <Route path="product/:uuid" element={<ProductDetailPage/>}/>
        <Route path="cart" element={<OrderListPage/>}/>
      </Route>
      <Route path="/invoice" element={<InvoicePage/>}/>
        {/* Admin Dashboard Routes */}
        <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard/></AdminRoute>}>
          <Route index element={<div>Select a section from the sidebar</div>} />
          <Route path="edit-user/:uuid" element={<UserPage />} />
          <Route path="user-list" element={<UserListPage />} />
          <Route path="supplier" element={<SupplierPage/>}/>
          <Route path="supplier/:uuid" element={<SupplierPage />} />
          <Route path="supplier-list" element={<SupplierListPage />} />
          <Route path="brand" element={<BrandPage/>}/>
          <Route path="brand/:uuid" element={<BrandPage />} />
          <Route path="brand-list" element={<BrandListPage />} />
          <Route path="category" element={<CategoryPage/>}/>
          <Route path="category/:uuid" element={<CategoryPage />} />
          <Route path="category-list" element={<CategoryListPage />} />
          <Route path="product" element={<ProductPage/>}/>
          <Route path="product/:uuid" element={<ProductPage />} />
          <Route path="product-list" element={<ProductListPage />} />
          <Route path="payment-list" element={<PaymentListPage />} />
        </Route>
    </Routes>
  );
}
