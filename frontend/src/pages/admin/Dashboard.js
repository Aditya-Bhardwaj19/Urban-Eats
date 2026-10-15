import React, { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../../components/Toast";

const Dashboard = () => {
  const [stats, setStats] = useState({
    orders: 0,
    users: 0,
    menu: 0,
    reviews: 0,
    reservations: 0,
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

 const fetchStats = async () => {
  setLoading(true);
  try {
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    const API_BASE = process.env.REACT_APP_API_URL || 'https://urban-eats-backk.onrender.com/api';
    const [orders, users, menu, reviews, reservations] = await Promise.all([
      axios.get(`${API_BASE}/orders/total`, headers),
      axios.get(`${API_BASE}/users/total`, headers),
      axios.get(`${API_BASE}/menu/total`, headers),
      axios.get(`${API_BASE}/reviews/total`, headers),
      axios.get(`${API_BASE}/reservations/total`, headers),
    ]);

    setStats({
      orders: orders.data.totalOrders || 0,
      users: users.data.totalUsers || 0,
      menu: menu.data.totalMenu || 0,
      reviews: reviews.data.totalReviews || 0,
      reservations: reservations.data.totalReservations || 0,
    });
  } catch (err) {
    console.error(err);
    Toast.error("Failed to load dashboard data");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center mt-10">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* Orders */}
        <div className="bg-white border rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300">
          <h2 className="text-sm text-gray-500 mb-2">Orders</h2>
          <p className="text-4xl font-bold text-indigo-600">
            {stats.orders}
          </p>
        </div>

        {/* Users */}
        <div className="bg-white border rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300">
          <h2 className="text-sm text-gray-500 mb-2">Users</h2>
          <p className="text-4xl font-bold text-blue-600">
            {stats.users}
          </p>
        </div>

        {/* Menu Items */}
        <div className="bg-white border rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300">
          <h2 className="text-sm text-gray-500 mb-2">Menu Items</h2>
          <p className="text-4xl font-bold text-green-600">
            {stats.menu}
          </p>
        </div>

        {/* Reviews */}
        <div className="bg-white border rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300">
          <h2 className="text-sm text-gray-500 mb-2">Reviews</h2>
          <p className="text-4xl font-bold text-yellow-500">
            {stats.reviews}
          </p>
        </div>

        {/* Reservations */}
        <div className="bg-white border rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300">
          <h2 className="text-sm text-gray-500 mb-2">Reservations</h2>
          <p className="text-4xl font-bold text-red-500">
            {stats.reservations}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;