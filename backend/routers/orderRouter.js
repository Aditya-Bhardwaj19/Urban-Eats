import express from "express";
import isAdmin from "../middleware/admin.js"
import authMiddleware from "../middleware/auth.js";
import {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    getAllOrders,
    cancelOrder,
    updatePayment,
    totalOrders
} from "../controllers/order.js";

const router = express.Router();
router.get("/total", authMiddleware, isAdmin, totalOrders);
router.post("/", authMiddleware, placeOrder);
router.get("/my", authMiddleware, getMyOrders);
router.get("/:id", authMiddleware, getOrderById);
router.put("/:id/status", authMiddleware, isAdmin, updateOrderStatus);
router.get("/", authMiddleware, isAdmin, getAllOrders);
router.delete("/:id", authMiddleware, cancelOrder);
router.put("/:id/payment", authMiddleware, updatePayment);
export default router;
