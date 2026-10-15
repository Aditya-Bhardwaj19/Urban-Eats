import React from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { MenuContext } from "../admin/contex/MenuContext"
import { MessageSquareQuote, CalendarCheck, ClipboardList, Home, UtensilsCrossed, Search, Plus } from "lucide-react";
function AdminNavbar({ onCreateClick }) {
  const location = useLocation();
  let title = "Dashboard";
  let icon = null;
  if (location.pathname === "/admin/dashboard") {
    title = "Dashboard";
    icon = <Home size={20} className="inline-block mr-4" />;
  }
  else if (location.pathname === "/admin/menu") {
    title = "Menu Management";
    icon = <UtensilsCrossed size={20} className="inline-block mr-4" />;
  }
  else if (location.pathname === "/admin/orders") {
    title = "Order Management";
    icon = <ClipboardList size={20} className="inline-block mr-4" />;
  }
  else if (location.pathname === "/admin/reservations") {
    title = "Reservation Management";
    icon = <CalendarCheck size={20} className="inline-block mr-4" />;
  }
  else if (location.pathname === "/admin/reviews") {
    title = "Review Management";
    icon = <MessageSquareQuote size={20} className="inline-block mr-4" />;
  }
  const { openCreate } = useContext(MenuContext);
  const { search, setSearch } = useContext(MenuContext);
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-lg font-medium font-serif">
        {icon}
        {title}
      </h1>

      <div>
        {location.pathname === "/admin/menu" && (
          <div className="flex items-center gap-4">

            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="py-1 pl-10 pr-3 border rounded"
                placeholder="Search Food Item..."
              />
            </div>

            <button
              onClick={openCreate}
              className="bg-[#EF6E3F] hover:bg-[#f38e46] text-white text-sm py-2 px-4 rounded-lg flex items-center"
            >
              <Plus size={16} className="mr-2" />
              Add Menu Item
            </button>

          </div>
        )}
      </div>
    </nav>
  );
}

export default AdminNavbar;