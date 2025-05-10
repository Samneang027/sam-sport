import React, { useEffect, useState } from 'react'
import Menu from '../components/menu';
import OrderList from '../components/order_list';
import { useParams } from 'react-router-dom';
import { getAllProduct } from "/service/product";
import { useCart } from '../contexts/CartContext';
import Footer from '../components/footer';
import ButtonPayment from '../components/button_payment';

export default function OrderListPage() {
  const {uuid} = useParams();
  const [content, setProduct] = useState(null);
  const {cartItems} = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getAllProduct();
      const productArray = data.content || [];
      const foundProduct = productArray.find((item) => item.uuid === uuid);
      setProduct(foundProduct);
    };
    fetchProduct();
  },[uuid]);
  const total = cartItems.reduce((sum, item) => sum + item.priceOut * item.quantity, 0);

  return (
    <div>
        <Menu/>
        <section className="mt-16 p-4 md:p-8 lg:p-12">
          <h1 className='p-4 text-title font-bold text-md md:text-2xl lg:text-4xl text-center'>ORDER PRODUCTS</h1>
          {/* <OrderList content={content}/> */}
          {cartItems.map((item, index) => (
          <OrderList key={index} content={item} />
          ))}
          <div className='flex border-2 border-primary mt-4'>
            <label className='bg-primary p-4 w-35 md:w-50 lg:w-70 items-center text-md md:text-xl lg:text-3xl text-white font-semibold text-center' htmlFor="">TOTAL</label>
            <input className='pt-4 pr-2 pb-4 pl-4 font-bold text-right text-md md:text-2xl lg:text-4xl text-title ' type="text" readOnly value={`$${total.toFixed(2)}`} />
          </div>
          <ButtonPayment/>
        </section>
        <Footer/>
    </div>
  )
}
