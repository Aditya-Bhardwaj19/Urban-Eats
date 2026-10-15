import React from "react";

function CategoryButton({ label, value, selectedCategory, setSelectedCategory }) {
  return (
    <button
      onClick={() => setSelectedCategory(value)}
      className={`mb-16 px-4 py-2 rounded-full transition 
        ${
          selectedCategory === value
            ? "bg-[#EF6E2F] text-white"
            : "bg-gray-50 text-gray-700 hover:bg-gray-200"
        }`}
    >
      {label}
    </button>
  );
}

export default CategoryButton;