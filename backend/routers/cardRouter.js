import express from 'express';
import { addToCart, getCartItems, updateCartItem, removeCartItem } from '../controllers/cart.js';
import authMiddleware from '../middleware/auth.js';
const router = express.Router();
router.post('/add', authMiddleware, addToCart);
router.get('/items', authMiddleware, getCartItems);
router.put('/update/:menuItemId', authMiddleware, updateCartItem);
router.delete('/delete/:menuItemId', authMiddleware, removeCartItem);
export default router;
