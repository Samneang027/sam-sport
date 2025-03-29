import React from "react";
import Menu from "./components/menu";
import Card from "./components/card";
import ButtonAdd from "./components/button_add";
import CardDetails from "./components/card_details";
import Footer from "./components/footer";
import ButtonShop from "./components/button_shop";
import CardSale from "./components/card_sale";
import OrderList from "./components/order_list";
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
    </div>
  );
}
