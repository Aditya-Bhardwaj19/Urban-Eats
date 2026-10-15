import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../../components/Toast";
import { Star, Trash2 } from "lucide-react";

function Review() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("token");

  const API_BASE = process.env.REACT_APP_API_URL || 'https://urban-eats-backk.onrender.com/api';

  // ✅ Fetch Reviews
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/reviews/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(res.data);
    } catch (err) {
      console.error(err);
      Toast.error(err.response?.data?.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Review
  const deleteReview = async () => {
    try {
      await axios.delete(`${API_BASE}/reviews/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReviews((prev) => prev.filter((r) => r._id !== deleteId));
      Toast.success("Review deleted successfully");
    } catch (err) {
      console.error(err);
      Toast.error(err.response?.data?.message || "Failed to delete review");
    } finally {
      setDeleteId(null);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Loading reviews...</p>;

  if (reviews.length === 0)
    return <p className="text-center mt-10">No reviews found</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        
        {/* HEADER */}
        <thead className="text-gray-500 border-t">
          <tr>
            <th className="px-4 py-3 text-left text-sm">Order No</th>
            <th className="px-4 py-3 text-left text-sm">Date</th>
            <th className="px-4 py-3 text-left text-sm">User</th>
            <th className="px-4 py-3 text-left text-sm">Item</th>
            <th className="px-4 py-3 text-left text-sm">Rating</th>
            <th className="px-4 py-3 text-left text-sm">Comment</th>
            <th className="px-4 py-3 text-left text-sm">Action</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {reviews.map((review, index) => (
            <tr key={review._id} className="border-t hover:bg-gray-50">
              
              {/* Order No */}
              <td className="px-3 py-2 text-sm font-semibold">
                ORD-{String(index + 1).padStart(3, "0")}
              </td>

              {/* Date */}
              <td className="px-3 py-2 text-sm">
                {review.createdAt
                  ? new Date(review.createdAt).toLocaleDateString()
                  : "N/A"}
              </td>

              {/* User */}
              <td className="px-3 py-2 text-sm">
                {review.user?.name || "Unknown"}
              </td>

              {/* Item */}
              <td className="px-3 py-2 text-sm">
                {review.menuItem?.name || "Unknown Item"}
              </td>

              {/* Rating */}
              <td className="px-3 py-2 text-sm flex items-center gap-1">
                <Star className="text-yellow-500" size={16} />
                {review.rating}
              </td>

              {/* Comment */}
              <td className="px-3 py-2 text-sm">
                {review.comment}
              </td>

              {/* Action (Trash Icon) */}
              <td className="px-3 py-2 text-sm">
                <div className="group relative w-fit">
                  <Trash2
                    onClick={() => setDeleteId(review._id)}
                    className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700 transition"
                  />

                  {/* Tooltip */}
                  <span className="absolute hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded -top-7 left-1/2 -translate-x-1/2">
                    Delete
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Custom Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Delete Review?
            </h2>

            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to delete this review?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-1 rounded border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={deleteReview}
                className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;