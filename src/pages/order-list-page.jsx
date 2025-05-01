import React, { useEffect, useState } from 'react'
import Menu from '../components/menu';
import OrderList from '../components/order_list';
import ButtonPayment from '../components/button_payment';
import { useParams } from 'react-router-dom';
import { getAllProduct } from "/service/product";
import { useCart } from '../contexts/CartContext';

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
        </section>
        <section>
          <h1 className='p-4 text-title font-bold text-md md:text-2xl lg:text-4xl text-center'>INFORMATION SHIPPING</h1>
          <div className='p-2 md:p-4'>
            <label for="username" className="block mb-2 text-md md:text-lg lg:text-2xl font-medium text-gray-900 dark:text-white">Username</label>
            <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-md md:text-lg lg:text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="SAM Sport" required />
          </div>
          <div className='p-2 md:p-4'>
            <label for="telephone" className="block mb-2 text-md md:text-lg lg:text-2xl font-medium text-gray-900 dark:text-white">Telephone</label>
            <input type="text" id="telephone" className="bg-gray-50 border border-gray-300 text-md md:text-lg lg:text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+885 1234567" required />
          </div>
          <div className='p-2 md:p-4'>
            <label for="gmail" className="block mb-2 text-md md:text-lg lg:text-2xl font-medium text-gray-900 dark:text-white">Gmail</label>
            <input type="gmail" id="gmail" className="bg-gray-50 border border-gray-300  text-md md:text-lg lg:text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="samsport@gmail.com" required />
          </div>
          <div className='p-2 md:p-4'>
            <label for="location" className="block mb-2 text-md md:text-lg lg:text-2xl font-medium text-gray-900 dark:text-white">Location</label>
            <input type="text" id="location" className="bg-gray-50 border border-gray-300 text-md md:text-lg lg:text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Betong, Phnom Penh" required />
          </div>
          <ButtonPayment/>
        </section>
    </div>
  )
}
