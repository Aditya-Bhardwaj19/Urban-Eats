import React from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "../pages/admin/AdminNavbar";
import { Outlet } from "react-router-dom"; 
function AdminLayout() {

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
<AdminNavbar />
        <div className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;