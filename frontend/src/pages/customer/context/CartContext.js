import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const token = localStorage.getItem("token");

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${API_BASE}/cards/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(res.data);
    } catch (error) {
      console.log("Fetch cart error:", error);
    }
  };


   const getCartItem = (menuItemId) => {
    return cartItems.find(
      (cartItem) => cartItem.menuItem?._id === menuItemId
    );
  };

   
const removeFromCart = async (menuItemId) => {
  try {
    const existingItem = getCartItem(menuItemId);

    if (!existingItem) return;

    const newQuantity = existingItem.quantity - 1;

    if (newQuantity > 0) {
      await axios.put(
        `${API_BASE}/cards/update/${menuItemId}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.delete(
        `${API_BASE}/cards/delete/${menuItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    await fetchCart();
  } catch (error) {
    console.error("Remove cart item error:", error);
  }
};


  const addToCart = async (item) => {
    try {
      console.log("Adding item:", item);

      const existingItem = cartItems.find(
        (cartItem) =>
          cartItem.menuItemId?._id === item._id || cartItem._id === item._id
      );

      const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

      const res = await axios.post(
        `${API_BASE}/cards/add`,
        {
          menuItemId: item._id,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Added:", res.data);

      fetchCart();
    } catch (error) {
      console.error("Add cart error:", error);
    }
  };

  useEffect(() => {
    if (token && userId) {
      fetchCart();
    }
  }, [token, userId]);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, fetchCart , getCartItem, removeFromCart}}
    >
      {children}
    </CartContext.Provider>
  );
};