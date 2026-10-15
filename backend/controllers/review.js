import Review from "../models/Review.js";
import Menu from "../models/menu.js";
// ✅ POST /api/reviews/:menuItemId → Add review
const addReview = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
    const { rating, comment, orderId } = req.body;

    // validate orderId
    if (!orderId) {
      return res.status(400).json({
        message: "Order ID is required",
      });
    }

    const menuItem = await Menu.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    // ✅ check duplicate review for SAME ORDER ONLY
    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      menuItem: menuItemId,
      order: orderId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You already reviewed this order item",
      });
    }

    const review = await Review.create({
      user: req.user._id,
      menuItem: menuItemId,
      order: orderId,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review added",
      review,
    });
  } catch (error) {
    console.error("ADD REVIEW ERROR:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ✅ GET /api/reviews/:menuId → Get reviews of menu item
const getReviewsByMenu = async (req, res) => {
  try {
    const reviews = await Review.find({
      menuItem: req.params.menuItemId,
    }).populate("user", "name");

    res.json(reviews);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getAllReviews = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const reviews = await Review.find()
      .populate("user", "name")
      .populate("menuItem", "name");

    res.json(reviews);
  } catch (error) {
    console.error("GET ALL REVIEWS ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ DELETE /api/reviews/:id → Delete review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await review.deleteOne();

    res.json({ message: "Review deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const totalReviews = async (req, res) => {
  try {
    const count = await Review.countDocuments();
    res.json({ totalReviews: count });
  } catch (error) { 
    res.status(500).json({ message: "Server error" });
  }
} 
export { addReview, getReviewsByMenu, deleteReview, getAllReviews, totalReviews};
