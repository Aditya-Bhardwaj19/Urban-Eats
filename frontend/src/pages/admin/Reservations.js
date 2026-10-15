import React, { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../../components/Toast";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const token = localStorage.getItem("token");

  const statusColors = {
    Pending: "text-yellow-600",
    Confirmed: "text-green-600",
    Cancelled: "text-red-600",
  };

  const API_BASE = process.env.REACT_APP_API_URL || 'https://urban-eats-backk.onrender.com/api';

  // ✅ Fetch reservations (with optional loader)
  const fetchReservations = async (showLoader = false) => {
    if (showLoader) setLoading(true);

    try {
      const res = await axios.get(
        `${API_BASE}/reservations/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ only update if changed (smooth UI)
      setReservations((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(res.data)) {
          return res.data;
        }
        return prev;
      });

    } catch (error) {
      Toast.error("Failed to load reservations");
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  // ✅ First load + auto refresh
  useEffect(() => {
    fetchReservations(true); // first load with loader

    const interval = setInterval(() => {
      fetchReservations(false); // silent refresh
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClick = () => setOpenDropdown(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // ✅ Update status
  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await axios.put(
        `${API_BASE}/reservations/${id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReservations((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: newStatus } : r
        )
      );

      Toast.success("Status updated");
    } catch (error) {
      Toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading reservations...</p>;
  }

  if (!reservations.length) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No reservations found
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-6 overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-xl">
        <thead className="text-gray-500 border-t">
          <tr>
            <th className="px-4 py-3 text-left text-sm">Customer</th>
            <th className="px-4 py-3 text-left text-sm">Date</th>
            <th className="px-4 py-3 text-left text-sm">Time</th>
            <th className="px-4 py-3 text-left text-sm">Guests</th>
            <th className="px-4 py-3 text-left text-sm">Status</th>
            <th className="px-4 py-3 text-left text-sm">Update</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((reservation, index) => (
            <tr
              key={reservation._id}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50/40" : "bg-white"
              }`}
            >
              <td className="px-3 py-2 text-sm">
                {reservation.user?.name || "N/A"}
              </td>

              <td className="px-3 py-2 text-sm">
                {new Date(reservation.date).toLocaleDateString()}
              </td>

              <td className="px-3 py-2 text-sm">
                {reservation.time}
              </td>

              <td className="px-3 py-2 text-sm font-medium">
                {reservation.guests}
              </td>

              {/* Status */}
              <td
                className={`px-3 py-2 text-sm font-semibold ${statusColors[reservation.status]}`}
              >
                {reservation.status}
              </td>

              {/* 🔥 FIXED DROPDOWN BUTTON */}
              <td className="px-3 py-2 text-sm">
                <div
                  onClick={(e) => {
                    e.stopPropagation();

                    const rect =
                      e.currentTarget.getBoundingClientRect();

                    setOpenDropdown({
                      id: reservation._id,
                      top: rect.bottom + 5,
                      left: rect.left,
                    });
                  }}
                  className={`px-3 py-1.5 rounded-lg border cursor-pointer bg-white text-sm font-semibold
                    ${statusColors[reservation.status]}
                  `}
                >
                  {updatingId === reservation._id
                    ? "Updating..."
                    : reservation.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔥 FLOATING DROPDOWN */}
      {openDropdown && (
        <div
          className="fixed z-[9999] bg-white border rounded-xl shadow-lg w-40"
          style={{
            top: openDropdown.top,
            left: openDropdown.left,
          }}
        >
          {["Pending", "Confirmed", "Cancelled"].map((status) => (
            <div
              key={status}
              onClick={(e) => {
                e.stopPropagation();
                updateStatus(openDropdown.id, status);
                setOpenDropdown(null);
              }}
              className="px-3 py-2 hover:bg-orange-100 cursor-pointer text-sm"
            >
              {status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;