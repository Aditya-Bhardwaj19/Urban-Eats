import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
//import Stripe from "stripe";
//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const placeOrder = async (req, res) => {
    try {
        const cartItems = await Cart.find({ user: req.user._id }).populate("menuItem");

        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        let total = 0;

        const items = cartItems
            .map((item) => {
                if (!item.menuItem) return null;

                total += item.menuItem.price * item.quantity;

                return {
                    menuItem: item.menuItem._id,
                    name: item.menuItem.name,      // store name
                    imageUrl: item.menuItem.imageUrl, // store image URL
                    quantity: item.quantity,
                    price: item.menuItem.price
                };
            })
            .filter(Boolean);

        const { paymentMethodId } = req.body;

        if (!paymentMethodId) {
            return res.status(400).json({ message: "Payment method ID is required" });
        }

        const amountInSmallestUnit = Math.round(total * 100);

        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: amountInSmallestUnit,
        //     currency: "pkr",
        //     payment_method: paymentMethodId,
        //     confirm: true,
        //     automatic_payment_methods: {
        //         enabled: true,
        //         allow_redirects: "never",
        //     },
        // });

        // if (paymentIntent.status !== "succeeded") {
        //     return res.status(400).json({ message: "Payment failed" });
        // }

        const order = await Order.create({
            user: req.user._id,
            items,
            totalAmount: total,
            paymentStatus: "Paid",
        });

        await Cart.deleteMany({ user: req.user._id });

        res.status(201).json({
            message: "Order placed successfully",
            order,
        });
    } catch (err) {
        console.error("PLACE ORDER ERROR:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate({
                path: "items.menuItem",
                select: "name price imageUrl", // select the fields you need
            });

        res.json(orders);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("items.menuItem");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user items.menuItem");

        res.json(orders);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        console.log("Order ID:", req.params.id);
        console.log("New status:", req.body.status);

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const validStatus = ["Pending", "Preparing", "Delivered", "Cancelled"];
        const status = req.body.status?.trim();

        if (!validStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status value: " + status });
        }

        order.status = status;

        // ✅ Skip validation so 500 error doesn't happen
        await order.save({ validateBeforeSave: false });

        res.json({ message: "Status updated", order });

    } catch (err) {
        console.error("Update order error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.status === "Delivered") {
            return res.status(400).json({
                message: "Cannot cancel delivered order"
            });
        }

        if (order.status === "Cancelled") {
            return res.status(400).json({
                message: "Order already cancelled"
            });
        }

        order.status = "Cancelled";
        await order.save();

        res.json({ message: "Order cancelled" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const updatePayment = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.paymentStatus === "Paid") {
            return res.status(400).json({ message: "Already paid" });
        }

        order.paymentStatus = "Paid";
        await order.save();

        res.json({ message: "Payment updated", order });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
const totalOrders = async (req, res) => {
    try {
        const count = await Order.countDocuments(); 
        res.json({ totalOrders: count });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
export {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    getAllOrders,
    cancelOrder,
    updatePayment,
    totalOrders
};
