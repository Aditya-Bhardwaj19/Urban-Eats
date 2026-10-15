import React from "react";
import { X } from "lucide-react";

function AdminMenuModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      
      {/* Modal Box */}
      <div className="bg-white w-[400px] rounded-lg shadow-lg p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Create Menu Item</h2>

        <input
          type="text"
          placeholder="Menu Name"
          className="w-full border p-2 rounded mb-3"
        />

        <button className="bg-[#B55D00] text-white px-4 py-2 rounded w-full">
          Save
        </button>
      </div>
    </div>
  );
}

export default AdminMenuModal;