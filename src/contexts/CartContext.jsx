import React, { createContext, useContext, useState } from 'react'
const CartContext = createContext();
export default function CartProvider({children}) {
    const [cartItems, setCartItems] = useState([]);
    // const addToCart = (product) => {
    //     setCartItems((prevItems) => [...prevItems, product]);
    // };
    // const removeFromCart = (uuid) => {
    //   setCartItems((prev) => prev.filter(item => item.uuid !== uuid));
    // };
    // const value = {
    //   cartItems,
    //   addToCart,
    //   removeFromCart
    // };
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists =prev.find(item => item.uuid === product.uuid);
      if (exists) {
        return prev.map(item => item.uuid === product.uuid ? {...item, quantity: item.quantity + 1} : item);
      }else {
        return [...prev, {...product, quantity: 1}];
      }
    });
  };

  const updateQuantity = (uuid, amount) => {
    setCartItems((prev) => prev.map(item => item.uuid === uuid ?{...item, quantity: Math.max(item.quantity + amount, 1)}
    :item
    )
  );
  };
  const removeFromCart = (uuid) => {
    setCartItems((prev) => prev.filter(item => item.uuid !== uuid));
  };
    return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
        {children}
    </CartContext.Provider>
  );
}
export function useCart() {
    return useContext(CartContext);
}
