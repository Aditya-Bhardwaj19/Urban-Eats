import express from "express";
import  authMiddleware  from "../middleware/auth.js";
import {addFavorite, getMyFavorites, removeFavorite} from "../controllers/favorite.js";
const router = express.Router();

router.post("/:menuItemId", authMiddleware, addFavorite);
router.get("/my", authMiddleware, getMyFavorites);
router.delete("/:menuItemId", authMiddleware, removeFavorite);
export default router