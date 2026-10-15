import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
  },
  { timestamps: true }
);

// prevent duplicate favorites
favoriteSchema.index({ user: 1, menuItem: 1 }, { unique: true });

export default mongoose.model("Favorite", favoriteSchema);
