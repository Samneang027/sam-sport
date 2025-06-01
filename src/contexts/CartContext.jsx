
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../../service/api";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartUuid, setCartUuid] = useState("");

  const token = localStorage.getItem("accessToken");

  const fetchCartByUserUuid = async (userUuid) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/carts/get-by-user/${userUuid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const cart = response.data;
    const cartItemsWithProduct = await Promise.all(
      cart.cartItems.map(async (item) => {
        const productRes = await axios.get(`${BASE_URL}/api/v1/products/${item.productUuid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return {
          ...productRes.data,
          quantity: item.quantity,
          cartItemUuid: item.uuid,
          totalPrice: productRes.data.priceOut * item.quantity
        };
      })
    );

    setCartUuid(cart.uuid);
    setCartItems(cartItemsWithProduct);
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};


  const updateQuantity = async (cartItemUuid, amount) => {
    try {
      const url = amount > 0
        ? `${BASE_URL}/api/v1/carts/add-quantity/${cartItemUuid}`
        : `${BASE_URL}/api/v1/carts/remove-quantity/${cartItemUuid}`;
      await axios.put(url, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userUuid = localStorage.getItem("userUuid");
      fetchCartByUserUuid(userUuid);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (cartItemUuid) => {
    try {
      await axios.put(`${BASE_URL}/api/v1/carts/remove-cart-item`, {
        cartUuid,
        cartItemUuid
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userUuid = localStorage.getItem("userUuid");
      fetchCartByUserUuid(userUuid);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

    const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  return (
    <CartContext.Provider value={{ cartItems, cartUuid, fetchCartByUserUuid, updateQuantity, removeFromCart,addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}



