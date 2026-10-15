import React, { useState, useContext } from "react";
import { CartContext } from "./context/CartContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";

// Load Stripe (replace with your test key)
const stripePromise = loadStripe("pk_test_51S6unFCdO2ctpZ6OQrkGqqoXIa6SrcBf7fwai7ySWKmbBSdzrMuJGAF2fhFtbD0gxQaLfHf1XwPPqE0KHuckGWZK00ZnPLlUHB");
const CheckoutForm = () => {
  const { cartItems, fetchCart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();

  const [form, setForm] = useState({
    street: "",
    city: "",
    zip: "",
    instructions: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.menuItem?.price || 0) * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      if (!stripe || !elements) {
        setError("Stripe not loaded");
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);

      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      const orderPayload = {
        items: cartItems.map((item) => ({
          menuItemId: item.menuItem._id,
          quantity: item.quantity,
        })),
        deliveryAddress: {
          street: form.street,
          city: form.city,
          zip: form.zip,
          instructions: form.instructions,
        },
        subtotal,
        paymentMethodId: paymentMethod.id, // send Stripe payment method to backend
      };

      const API_BASE = process.env.REACT_APP_API_URL || 'https://urban-eats-backk.onrender.com/api';
      const res = await axios.post(`${API_BASE}/orders/`, orderPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Order placed successfully!");
      fetchCart(); // refresh cart
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
        <Link
        to="/customer/cart"
        className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block"
      >
        &larr; Back to Cart
      </Link>
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Delivery Address */}
          <div>
            <label className="block font-semibold">Street Address</label>
            <input
              type="text"
              name="street"
              value={form.street}
              onChange={handleChange}
              required
              placeholder="123 Main Street"
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                placeholder="New York"
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="block font-semibold">ZIP Code</label>
              <input
                type="text"
                name="zip"
                value={form.zip}
                onChange={handleChange}
                required
                placeholder="10001"
                className="w-full border p-2 rounded mt-1"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold">Delivery Instructions (optional)</label>
            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              placeholder="Ring the bell, leave at door..."
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          {/* Stripe Payment */}
          <div>
            <label className="block font-semibold mb-2">Payment</label>
            <div className="border p-2 rounded mt-1">
              <CardElement />
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold mt-4"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Wrap the form in Stripe Elements
const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default CheckoutPage;