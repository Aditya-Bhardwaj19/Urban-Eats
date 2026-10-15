import React, { useContext, useMemo, useState } from "react";
import { CartContext } from "./context/CartContext";
import { Trash2, Plus, Minus, MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CustomerCard() {
  const { cartItems, fetchCart } = useContext(CartContext);
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();
const API_BASE = process.env.REACT_APP_API_URL || 'https://urban-eats-backk.onrender.com/api';

  const updateQuantity = async (menuItemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setLoadingId(menuItemId);
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_BASE}/cards/update/${menuItemId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const deleteItem = async (menuItemId) => {
    try {
      setLoadingId(menuItemId);
      const token = localStorage.getItem("token");

      await axios.delete(`${API_BASE}/cards/delete/${menuItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.menuItem?.price) || 0;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const deliveryCharges = 0;
  const otherPayment = 0;
  const total = subtotal + deliveryCharges + otherPayment;

  return (
    <div className="p-6 md:p-10">
      <Link
        to="/customer/menu"
        className="text-gray-500 hover:underline mb-4 inline-block text-sm"
      >
        <MoveLeft height={24} width={16} className="inline-block mr-1" />
        Continue Shopping
      </Link>

      <h1 className="text-2xl font-bold mb-6 font-serif">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border rounded-xl p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  <img
                    src={item.menuItem?.imageUrl}
                    alt={item.menuItem?.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div>
                    <h2 className="font-semibold text-lg">
                      {item.menuItem?.name}
                    </h2>

                    <p className="text-gray-500">
                      {item.menuItem?.category}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.menuItem?._id, item.quantity - 1)
                        }
                        disabled={
                          loadingId === item.menuItem?._id || item.quantity <= 1
                        }
                        className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="font-medium">{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.menuItem?._id, item.quantity + 1)
                        }
                        disabled={loadingId === item.menuItem?._id}
                        className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                  <p className="font-semibold text-lg">
                    {(Number(item.menuItem?.price) || 0) * item.quantity}
                  </p>

                  <button
                    onClick={() => deleteItem(item.menuItem?._id)}
                    disabled={loadingId === item.menuItem?._id}
                    className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border rounded-xl p-6 shadow-sm h-fit bg-white">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>

              <div className="flex justify-between">
                <span>Other Payment</span>
                <span>{otherPayment}</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{total}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/customer/checkout")}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerCard;