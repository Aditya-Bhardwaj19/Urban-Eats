// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useContext } from "react";
// import { CartContext } from "./context/CartContext";
// import { Search, ShoppingCart, Heart } from "lucide-react";
// import CategoryButton from "./components/CategoryButton";
// import { FavoritesContext } from "./context/FavoritesContext";
// function CustomerMenu() {
//   const [menuItems, setMenuItems] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const { addToCart } = useContext(CartContext);
//   const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
//   const fetchMenu = async () => {
//     const response = await axios.get("https://forked-serene-livedistro--aroobmushtaq7.replit.app/api/menu/get");
//     setMenuItems(response.data);
//   };

//   useEffect(() => {
//     fetchMenu();
//   }, []);

//   const filteredItems = menuItems.filter((item) => {
//     const matchSearch = item.name
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchCategory =
//       selectedCategory === "all" || item.category === selectedCategory;

//     return matchSearch && matchCategory;
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-12">

//       {/* Header */}
//       <div className=" mb-10">
//         <h1 className="text-4xl font-serif font-bold">Our Menu</h1>
//         <p className="text-gray-500 ">
//           Discover dishes crafted with passion
//         </p>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-6">
//         <div className="relative w-full max-w-md">
//           <Search className="absolute left-3 top-3 text-gray-400" size={18} />
//           <input
//             type="text"
//             placeholder="Search for dishes..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
//           />
//         </div>
//       </div>
//       <div className="flex gap-3 mt-6 flex-wrap">

//         <CategoryButton
//           label="All"
//           value="all"
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />

//         <CategoryButton
//           label="Starters"
//           value="appetizer"
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />

//         <CategoryButton
//           label="Burgers"
//           value="main_course"
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />

//         <CategoryButton
//           label="Pizza"
//           value="pizza"
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />

//         <CategoryButton
//           label="Salads"
//           value="salads"
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />

//         <CategoryButton
//           label="Dessert"
//           value="dessert"
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />

//         <CategoryButton
//           label="Beverage"
//           value="beverage"
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />

//       </div>
//       {/* Menu Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
//         {filteredItems.length === 0 ? (
//           <p className="col-span-full text-center text-gray-500 text-lg">
//             No dishes available
//           </p>
//         ) : (
//           filteredItems.map((item) =>
//             <div
//               key={item._id}
//               className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
//             >
//               <div className="relative">

//                 <img
//                   src={item.imageUrl}
//                   alt={item.name}
//                   className="w-full h-52 object-cover"
//                 />


//                 <Heart
//                   size={30}
//                   onClick={() => toggleFavorite(item._id)}
//                   className="absolute top-3 right-3 p-1 rounded-full cursor-pointer bg-black/40"
//                   color={isFavorite(item._id) ? "red" : "white"}
//                   fill={isFavorite(item._id) ? "red" : "none"}
//                 />
//               </div>

//               <div className="p-5">
//                 <h2 className="text-xl font-semibold">{item.name}</h2>

//                 <p className="text-gray-500 text-sm mt-1 line-clamp-2">
//                   {item.description}
//                 </p>

//                 <div className="flex items-center justify-between mt-4">
//                   <span className="text-lg font-bold text-[#EF6E2F]">
//                     {item.price.toFixed(2)}
//                   </span>

//                   <button
//                     onClick={() => {
//                       console.log("Adding item:", item);
//                       addToCart(item);
//                     }}
//                     className="flex items-center gap-1 bg-[#EF6E2F] text-white px-3 py-1.5 rounded-full text-sm hover:bg-[#E97229] transition">
//                     <ShoppingCart size={16} />
//                     Add
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>

//     </div>
//   );
// }

// export default CustomerMenu;
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "./context/CartContext";
import { FavoritesContext } from "./context/FavoritesContext";
import { Search, ShoppingCart, Heart, Star } from "lucide-react";
import CategoryButton from "./components/CategoryButton";

function CustomerMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState({}); // 🔥 store reviews by itemId
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

const API_BASE = process.env.REACT_APP_API_URL || 'https://urban-eats-backk.onrender.com/api';

  const fetchMenu = async () => {
    const res = await axios.get(`${API_BASE}/menu/get`);
    setMenuItems(res.data);
  };

  // 🔥 Fetch reviews for one item
  const fetchReviews = async (menuId) => {
    try {
      const res = await axios.get(
        `${API_BASE}/reviews/${menuId}`
      );

      setReviews((prev) => ({
        ...prev,
        [menuId]: res.data,
      }));
    } catch (err) {
      console.error("Error fetching reviews", err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // 🔥 Fetch reviews when menu loads
  useEffect(() => {
    menuItems.forEach((item) => {
      fetchReviews(item._id);
    });
  }, [menuItems]);

  // 🔥 Calculate average rating
  const getAverageRating = (menuId) => {
    const itemReviews = reviews[menuId] || [];
    if (itemReviews.length === 0) return 0;

    const avg =
      itemReviews.reduce((sum, r) => sum + r.rating, 0) /
      itemReviews.length;

    return avg.toFixed(1);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-serif font-bold mb-6">Our Menu</h1>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Menu */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition"
          >
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-52 object-cover"
              />

              <Heart
                size={28}
                onClick={() => toggleFavorite(item._id)}
                className="absolute top-3 right-3 p-1 rounded-full cursor-pointer bg-black/40"
                color={isFavorite(item._id) ? "red" : "white"}
                fill={isFavorite(item._id) ? "red" : "none"}
              />
            </div>

            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{item.name}</h2>

              {/* ⭐ Rating */}
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={16} fill="gold" />
                <span className="text-sm text-gray-700">
                  {getAverageRating(item._id)} (
                  {(reviews[item._id] || []).length})
                </span>
              </div>

              <p className="text-gray-500 text-sm line-clamp-2">
                {item.description}
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-[#EF6E2F] font-bold">
                  {item.price}
                </span>

                  {(() => {
                        const cartEntry = cartItems.find(
                          (cartItem) => cartItem.menuItem?._id === item._id,
                        );

                        return cartEntry ? (
                          <div className="flex items-center gap-3 bg-[#EF6E2F] text-white px-3 py-1.5 rounded-full">
                         <ShoppingCart size={16} />
                            
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="font-bold text-lg"
                            >
                              −
                            </button>

                            <span>{cartEntry.quantity}</span>

                            <button
                              onClick={() => addToCart(item)}
                              className="font-bold text-lg"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          
                          <button
                            onClick={() => addToCart(item)}
                            className="flex items-center gap-1 bg-[#EF6E2F] text-white px-3 py-1.5 rounded-full text-sm hover:bg-[#E97229] transition"
                          >
                         <ShoppingCart size={16} />

                            Add
                          </button>
                        );
                      })()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerMenu;