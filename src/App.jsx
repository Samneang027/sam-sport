import React from "react";
import Menu from "./components/menu";
import Card from "./components/card";
import ButtonAdd from "./components/button_add";
import CardDetails from "./components/card_details";
import Footer from "./components/footer";
import ButtonShop from "./components/button_shop";
import CardSale from "./components/card_sale";
import OrderList from "./components/order_list";
import HeaderSlide from "./components/header_slide";
export default function MyApp() {
  return (
    <div>
      <Menu />
      <Card />
      <ButtonAdd />
      <ButtonShop/>
      <CardDetails/>
      <Footer/>
      <CardSale/>
      <OrderList/>
      <HeaderSlide/>
    </div>
  );
}
