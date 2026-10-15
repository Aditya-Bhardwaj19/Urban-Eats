// import React from "react";
// import { Link } from "react-router-dom";
// import { ListOrdered, Utensils, LayoutDashboard, Calendar, Star } from "lucide-react";
// function Sidebar() {
//   return (
//     <div className="w-64 bg-[#251D18] text-white min-h-screen">

//       {/* Flex Column Layout */}
//       <div className=" p-5">

//         <h2 className="text-xl font-bold mb-6 font-serif">
//           Admin Panel
//         </h2>
//         <div className="text-[#A8ADA0]">
//           <Link
//             to="/admin/dashboard"
//             className="block hover:bg-gray-700 p-2  rounded"
//           >
//             <LayoutDashboard className="inline-block mr-2" size={18} />
//             Dashboard
//           </Link>

//           <Link
//             to="/admin/menu"
//             className="block hover:bg-gray-700 p-2 rounded"
//           >
//             <Utensils className="inline-block mr-2" size={18} />
//             Manage Menu
//           </Link>

//           <Link
//             to="/admin/orders"
//             className="block hover:bg-gray-700 p-2 rounded"
//           >
//             <ListOrdered className="inline-block mr-2" size={18} />
//             orders
//           </Link>
//           <Link
//             to="/admin/reservations"
//             className="block hover:bg-gray-700 p-2 rounded"
//           >
//             <Calendar className="inline-block mr-2" size={18} />
//             Reservations
//           </Link>
//           <Link
//             to="/admin/reviews"
//             className="block hover:bg-gray-700 p-2 rounded"
//           >
//             <Star className="inline-block mr-2" size={18} />
//             Reviews
//           </Link>


//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListOrdered, Utensils, LayoutDashboard, Calendar, Star, LogOut } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // redirect to login page
  };

  return (
    <div className="w-64 bg-[#251D18] text-white min-h-screen flex flex-col justify-between">

      {/* Top links */}
      <div className="p-5">
        <h2 className="text-xl font-bold mb-6 font-serif">
          Admin Panel
        </h2>
        <div className="text-[#A8ADA0] space-y-2">
          <Link
            to="/admin/dashboard"
            className="block hover:bg-gray-700 p-2 rounded flex items-center"
          >
            <LayoutDashboard className="mr-2" size={18} />
            Dashboard
          </Link>

          <Link
            to="/admin/menu"
            className="block hover:bg-gray-700 p-2 rounded flex items-center"
          >
            <Utensils className="mr-2" size={18} />
            Manage Menu
          </Link>

          <Link
            to="/admin/orders"
            className="block hover:bg-gray-700 p-2 rounded flex items-center"
          >
            <ListOrdered className="mr-2" size={18} />
            Orders
          </Link>

          <Link
            to="/admin/reservations"
            className="block hover:bg-gray-700 p-2 rounded flex items-center"
          >
            <Calendar className="mr-2" size={18} />
            Reservations
          </Link>

          <Link
            to="/admin/reviews"
            className="block hover:bg-gray-700 p-2 rounded flex items-center"
          >
            <Star className="mr-2" size={18} />
            Reviews
          </Link>
        </div>
      </div>

      {/* Logout button at bottom */}
      <div className="p-5">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 p-2 rounded flex items-center justify-center"
        >
          <LogOut className="mr-2" size={18} />
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;