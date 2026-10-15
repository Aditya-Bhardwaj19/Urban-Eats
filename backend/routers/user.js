import { registerUser, loginUser, getUserProfile,userUpdateProfile, totalUser} from "../controllers/user.js";
import express from "express";
import isAdmin from "../middleware/admin.js"
import authMiddleware from "../middleware/auth.js";
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', authMiddleware, userUpdateProfile);
router.get('/profile', authMiddleware, getUserProfile);
router.get("/total", authMiddleware, isAdmin, totalUser);
export default router;