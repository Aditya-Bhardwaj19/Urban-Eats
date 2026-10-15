import React, { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../../components/Toast";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewData, setReviewData] = useState({});
  // { [menuItemId]: { comment: "", rating: 5, loading: false, submitted: false } }

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_BASE}/orders/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data);

      // Initialize reviewData
      const initReviews = {};

      for (const order of res.data) {
        for (const item of order.items) {
          const menuItemId = item.menuItem?._id;
          if (!menuItemId) continue;

          try {
            const reviewRes = await axios.get(
              `${API_BASE}/reviews/${menuItemId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            // Find review by current user
            const myReview = reviewRes.data.find(
              (r) => r.user?._id === user?._id || r.user === user?._id
            );

            const key = `${order._id}_${menuItemId}`;

            if (myReview) {
              initReviews[key] = {
                comment: myReview.comment,
                rating: myReview.rating,
                submitted: true,
                loading: false,
              };
            } else {
              initReviews[key] = {
                comment: "",
                rating: 5,
                submitted: false,
                loading: false,
              };
            }
          } catch (e) {
            console.error(e);
          }
        }
      }

      setReviewData(initReviews);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchOrders();
  // }, []);
  const fetchOrdersOnly = async () => {
  try {
    const res = await axios.get(
      `${API_BASE}/orders/my`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setOrders(res.data); // ✅ ONLY update orders
  } catch (err) {
    console.error(err);
  }
};
useEffect(() => {
  fetchOrders(); // first load (with reviews)

  const interval = setInterval(() => {
    fetchOrdersOnly(); // only update status
  }, 5000);

  return () => clearInterval(interval);
}, []);
  const handleReviewChange = (key, field, value) => {
    setReviewData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const submitReview = async (menuItemId, orderId) => {
    const key = `${orderId}_${menuItemId}`;
    const { comment, rating } = reviewData[key] || {};

    if (!comment?.trim()) return Toast.error("Please enter a comment!");

    try {
      handleReviewChange(key, "loading", true);

      await axios.post(
        `${API_BASE}/reviews/${menuItemId}`,
        { comment, rating: Number(rating), orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      handleReviewChange(key, "submitted", true);
      handleReviewChange(key, "loading", false);

      Toast.success("Review submitted!");
    } catch (err) {
      console.error(err);
      handleReviewChange(key, "loading", false);
      Toast.error(err.response?.data?.message || "Failed to submit review");
    }
  };

  const formatOrderNumber = (index) => `ORD-${String(index + 1).padStart(3, "0")}`;

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!orders.length) return <p className="text-center mt-10">No orders yet.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 font-serif">My Orders</h1>
      <p className="mb-6 text-gray-600">Track and manage your orders</p>

      {orders.map((order, index) => {
        const total = order.items.reduce(
          (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
          0
        );

        return (
          <div key={order._id} className="border rounded p-4 mb-6 shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{formatOrderNumber(index)}</span>
              <span className="px-2 py-1 rounded bg-gray-100 text-gray-600">
                {order.status || "Unknown"}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-2">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString()
                : "Date unavailable"}
            </p>

            <div className="space-y-3">
              {order.items.map((item, idx) => {
                const key = `${order._id}_${item.menuItem?._id}`;
                const review = reviewData[key] || {
                  comment: "",
                  rating: 5,
                  submitted: false,
                  loading: false,
                };

                return (
                  <div key={idx} className="flex flex-col border-b pb-2 mb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.menuItem?.imageUrl || "https://via.placeholder.com/48"}
                          alt={item.menuItem?.name || "Item"}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium">
                            {item.quantity}x {item.name || "Item"}
                          </p>

                          {/* Show review form only if not submitted */}
                          {order.status === "Delivered" && !review.submitted && (
                            <div className="mt-2 space-y-1">
                              <select
                                value={review.rating}
                                onChange={(e) =>
                                  handleReviewChange(key, "rating", Number(e.target.value))
                                }
                                className="border px-2 py-1 rounded text-sm"
                              >
                                {[5, 4, 3, 2, 1].map((r) => (
                                  <option key={r} value={r}>
                                    {r} Star{r > 1 ? "s" : ""}
                                  </option>
                                ))}
                              </select>

                              <input
                                type="text"
                                value={review.comment}
                                onChange={(e) =>
                                  handleReviewChange(key, "comment", e.target.value)
                                }
                                placeholder="Write your review..."
                                className="border px-2 py-1 rounded text-sm w-full"
                              />

                              <button
                                onClick={() => submitReview(item.menuItem._id, order._id)}
                                disabled={review.loading}
                                className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                              >
                                {review.loading ? "Submitting..." : "Submit"}
                              </button>
                            </div>
                          )}

                          {/* Show after submission */}
                          {review.submitted && (
                            <p className="text-green-500 text-sm mt-1">Review submitted!</p>
                          )}
                        </div>
                      </div>

                      <div>PKR {(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 font-semibold text-right">
              Total: PKR {total.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerOrders;