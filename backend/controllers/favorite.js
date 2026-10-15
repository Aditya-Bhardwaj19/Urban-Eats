import Favorite from "../models/Favorite.js";
import Menu from "../models/menu.js";
const addFavorite = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;  // ✅ from params

    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    const favorite = new Favorite({
      user: req.user._id,
      menuItem: menuItemId,
    });

    await favorite.save();

    res.status(201).json({ message: "Added to favorites", favorite });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already in favorites" });
    }
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
const getMyFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user._id }).populate("menuItem");
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};  
const removeFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findOneAndDelete({
            user: req.user._id,
            menuItem: req.params.menuItemId
        });
        if (!favorite) {
            return res.status(404).json({ message: "Favorite not found" });
        }
        res.json({ message: "Removed from favorites", favorite });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
export { addFavorite, getMyFavorites, removeFavorite };