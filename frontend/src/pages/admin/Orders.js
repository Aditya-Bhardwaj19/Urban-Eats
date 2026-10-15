// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Toast from "../../components/Toast"; // same toast as Menu.js

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [updatingId, setUpdatingId] = useState(null);

//   const token = localStorage.getItem("token");
//   const statusOptions = ["Pending", "Preparing", "Delivered", "Cancelled"];

//   // ✅ Fetch all orders
//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("https://forked-serene-livedistro--aroobmushtaq7.replit.app/api/orders/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(res.data);
//     } catch (err) {
//       if (err.response?.status === 403) {
//         Toast.error("Admin access required!");
//       } else {
//         Toast.error("Failed to fetch orders");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Update order status
//   const updateStatus = async (orderId, status) => {
//     setUpdatingId(orderId);
//     try {
//       await axios.put(
//         `https://forked-serene-livedistro--aroobmushtaq7.replit.app/api/orders/${orderId}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Instant UI update
//       setOrders((prev) =>
//         prev.map((o) => (o._id === orderId ? { ...o, status } : o))
//       );

//       Toast.success("Status updated successfully");
//     } catch (err) {
//       Toast.error(err.response?.data?.message || "Failed to update status");
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading orders...</p>;
//   if (orders.length === 0) return <p className="text-center mt-10">No orders found</p>;

//   return (
//     <div className="overflow-x-auto max-w-7xl mx-auto ">
//       <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
//         <thead className="text-gray-500 border-t">
//           <tr>
//             <th className="px-4 py-3 text-left text-sm">Order ID</th>
//             <th className="px-4 py-3 text-left text-sm">User</th>
//             <th className="px-4 py-3 text-left text-sm">Items</th>
//             <th className="px-4 py-3 text-left text-sm">Total</th>
//             <th className="px-4 py-3 text-left text-sm">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order._id} className="border-t">
//               <td className="px-3 py-2 text-sm font-medium">{order._id}</td>
//               <td className="px-3 py-2 text-sm">{order.user?.name || "Unknown"}</td>
//               <td className="px-3 py-2 text-sm">
//                 {order.items.map((item, idx) => (
//                   <div key={idx} className="flex justify-between">
//                     <span>
//                       {item.quantity}x {item.name}
//                     </span>
//                     <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
//                   </div>
//                 ))}
//               </td>
//               <td className="px-3 py-2 text-sm font-semibold">
//                 PKR {order.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toLocaleString()}
//               </td>
//               <td className="px-3 py-2 text-sm">
//                 <select
//                   value={order.status}
//                   onChange={(e) => updateStatus(order._id, e.target.value.trim())}
//                   className={`px-2 py-1 rounded text-sm font-semibold border
//     ${order.status === "Pending" && "text-yellow-700"}
//     ${order.status === "Preparing" && "text-blue-700"}
//     ${order.status === "Delivered" && "text-green-700"}
//     ${order.status === "Cancelled" && "text-red-700"}
//   `}
//                   disabled={updatingId === order._id}
//                 >
//                   {statusOptions.map((s) => (
//                     <option key={s} value={s}>
//                       {s}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Orders;



import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../../components/Toast";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const token = localStorage.getItem("token");
  const statusOptions = ["Pending", "Preparing", "Delivered", "Cancelled"];

  const API_BASE = process.env.REACT_APP_API_URL || 'https://urban-eats-backk.onrender.com/api';

  // Fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE}/orders/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(res.data);
    } catch (err) {
      Toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Update status
  const updateStatus = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      await axios.put(
        `${API_BASE}/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o))
      );

      Toast.success("Status updated");
    } catch (err) {
      Toast.error("Failed to update");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = () => setOpenDropdownId(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (orders.length === 0)
    return <p className="text-center mt-10">No orders</p>;

  return (
    <div className="overflow-x-auto max-w-7xl mx-auto relative">
      <table className="min-w-full bg-white shadow-md rounded-xl">
        <thead className="text-gray-500 border-t">
          <tr>
            <th className="px-4 py-3 text-left text-sm">Order ID</th>
            <th className="px-4 py-3 text-left text-sm">User</th>
            <th className="px-4 py-3 text-left text-sm">Items</th>
            <th className="px-4 py-3 text-left text-sm">Total</th>
            <th className="px-4 py-3 text-left text-sm">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">

              {/* ID */}
              <td className="px-3 py-2 text-sm font-medium">
                {order._id}
              </td>

              {/* User */}
              <td className="px-3 py-2 text-sm">
                {order.user?.name || "Unknown"}
              </td>

              {/* Items */}
              <td className="px-3 py-2 text-sm">
                {order.items.map((item, idx) => (
                  <div key={idx}>
                    {item.quantity}x {item.name}
                  </div>
                ))}
              </td>

              {/* Total */}
              <td className="px-3 py-2 text-sm font-semibold">
                PKR{" "}
                {order.items
                  .reduce((sum, i) => sum + i.price * i.quantity, 0)
                  .toLocaleString()}
              </td>

              {/* Status */}
              <td className="px-3 py-2 text-sm">
                <div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();

                      const rect = e.currentTarget.getBoundingClientRect();

                      setDropdownPos({
                        top: rect.bottom + window.scrollY + 4,
                        left: rect.left + window.scrollX,
                      });

                      setOpenDropdownId(
                        openDropdownId === order._id ? null : order._id
                      );
                    }}
                    className={`px-3 py-1 rounded-lg border cursor-pointer bg-white text-sm font-semibold
                      ${order.status === "Pending" && "text-yellow-700 border-yellow-300"}
                      ${order.status === "Preparing" && "text-blue-700 border-blue-300"}
                      ${order.status === "Delivered" && "text-green-700 border-green-300"}
                      ${order.status === "Cancelled" && "text-red-700 border-red-300"}
                    `}
                  >
                    {order.status}
                  </div>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* GLOBAL DROPDOWN */}
      {openDropdownId && (
        <div
          className="fixed z-50 w-40 bg-white border rounded-xl shadow-xl max-h-40 overflow-y-auto"
          style={{
            top: dropdownPos.top,
            left: dropdownPos.left,
          }}
        >
          {statusOptions.map((s) => (
            <div
              key={s}
              onClick={() => {
                updateStatus(openDropdownId, s);
                setOpenDropdownId(null);
              }}
              className="px-3 py-2 hover:bg-orange-100 cursor-pointer text-sm"
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;