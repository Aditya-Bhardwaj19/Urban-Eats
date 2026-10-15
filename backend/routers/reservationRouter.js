import express from "express";
import authMiddleware from "../middleware/auth.js";
import isAdmin from "../middleware/admin.js";
import {
  createReservation,
  getMyReservations,
  updateReservation,
  getAllReservations,
  updateReservationStatus,
  totalReservations
} from "../controllers/reservation.js";
const router = express.Router();

router.post("/", authMiddleware, createReservation);
router.get("/my", authMiddleware, getMyReservations);
router.put("/:id", authMiddleware, updateReservation);
router.get("/total", authMiddleware, isAdmin, totalReservations);
router.get("/", authMiddleware, isAdmin, getAllReservations);
router.put("/:id/status", authMiddleware, isAdmin, updateReservationStatus);
export default router;
