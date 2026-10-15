import Cart from "../models/Cart.js";
import menu from "../models/menu.js"
const addToCart = async (req, res) => {
    try {
        const { menuItemId, quantity } = req.body;
        const menuItem = await menu.findById(menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        let cartItem = await Cart.findOne({
            user: req.user._id,
            menuItem: menuItemId
        });

        if (cartItem) {
            cartItem.quantity += quantity || 1;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({
                user: req.user._id,
                menuItem: menuItemId,
                quantity: quantity || 1
            });
        }
        res.status(201).json({ message: 'Item added to cart', cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error(error);
    }
};
const getCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find({ user: req.user._id }).populate('menuItem');
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error(error);
    }
};
const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const cartItem = await Cart.findOne({ user: req.user._id, menuItem: req.params.menuItemId });
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();
        res.json({ message: 'Cart item updated', cartItem });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error(error);
    }
};
const removeCartItem = async (req, res) => {
    try {
        const cartItem = await Cart.findOne({ user: req.user._id, menuItem: req.params.menuItemId });
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        await cartItem.deleteOne();
        res.json({ message: 'Cart item removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error(error);
    }
};
export { addToCart, getCartItems, updateCartItem, removeCartItem };
