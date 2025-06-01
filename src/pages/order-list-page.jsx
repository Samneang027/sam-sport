

import React, { useEffect, useState } from 'react';
import Menu from '../components/menu';
import OrderList from '../components/order_list';
import { useCart } from '../contexts/CartContext';
import Footer from '../components/footer';
import ButtonInvoice from '../components/button_invoice';
import { placeOrder } from '/service/product';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "/service/api";

export default function OrderListPage() {
  const { cartItems, fetchCartByUserUuid, cartUuid } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const userUuid = localStorage.getItem("userUuid");
    if (userUuid) {
      fetchCartByUserUuid(userUuid);
    }
  }, []);

 const total = cartItems.reduce((sum, item) => sum + (item.priceOut * item.quantity), 0);

const handlePlaceOrder = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    const userUuid = localStorage.getItem("userUuid");

    if (!userUuid || !cartUuid) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Info',
        text: 'User or cart not found',
      });
      return;
    }

    const result = await placeOrder({
      token,
      userUuid,
      cartUuid,
      totalAmount: total,
      cartItems
    });

    console.log("Order placed successfully:", result);

    const response = await fetch(`${BASE_URL}/api/v1/users/${userUuid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const userData = await response.json();

    const user = {
      name: userData.username,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
      address: `${userData.address.addressLine1 || ''} ${userData.address.addressLine2 || ''} ${userData.address.road || ''}`.trim() || 'No address provided',
      linkAddress: userData.address.linkAddress || 'https://maps.google.com',
    };

    localStorage.setItem('invoiceUser', JSON.stringify(user));
    localStorage.setItem('invoiceCartItems', JSON.stringify(cartItems));
    localStorage.setItem('orderUuid', result.uuid || result.id || result.orderUuid);

    Swal.fire({
      icon: 'success',
      title: 'Order Placed!',
      text: 'Your order has been placed successfully.',
    }).then(() => {
      navigate('/invoice');
    });

  } catch (error) {
    console.error("Error placing order:", error);
    Swal.fire({
      icon: 'error',
      title: 'Order Failed',
      text: 'Something went wrong while placing your order.',
    });
  } finally {
    setLoading(false);
  }
};



  return (
    <div>
      <Menu />
      <section className="mt-16 p-4 md:p-8 lg:p-12">
        <h1 className='p-4 text-title font-bold text-md md:text-2xl lg:text-4xl text-center'>ORDER PRODUCTS</h1>
        {cartItems.map((item, index) => (
          <OrderList key={index} content={item} />
        ))}
        <div className='flex border-2 border-primary mt-4'>
          <label className='bg-primary p-4 w-35 md:w-50 lg:w-70 items-center text-md md:text-xl lg:text-3xl text-white font-semibold text-center' htmlFor="">TOTAL</label>
          <input className='pt-4 pr-2 pb-4 pl-4 font-bold text-right text-md md:text-2xl lg:text-4xl text-title ' type="text" readOnly value={`$${total.toFixed(2)}`} />
        </div>
        <ButtonInvoice onClick={handlePlaceOrder} />
        {loading && <p className="text-center text-primary mt-2">Placing order...</p>}
      </section>
      <Footer />
    </div>
  );
}




