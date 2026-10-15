import React, { useContext, useEffect } from "react";
import { FavoritesContext } from "./context/FavoritesContext";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "./context/CartContext";

function CustomerFavorites() {
  const { favorites, fetchFavorites, removeFavorite } = useContext(FavoritesContext);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 font-serif">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorite items found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {favorites.map((fav) => {
            const item = fav.menuItem || fav;

            return (
              <div
                key={fav._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">
                  <h2 className="text-xl font-semibold">{item.name}</h2>

                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <span className="text-lg font-bold text-[#EF6E2F]">
                    {item.price}
                  </span>
                  <div className="flex items-center justify-between mt-4">
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
                    <button
                      onClick={() => removeFavorite(item._id)}
                      className="bg-red-500 text-white px-3 py-2 rounded-full text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomerFavorites;