import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRoutes from './routers/user.js'
import menuRoutes from './routers/menuRouter.js'
import cardRoutes from './routers/cardRouter.js'
import reviewRoutes from "./routers/reviewRouter.js";
import orderRoutes from "./routers/orderRouter.js";
import favoriteRoutes from "./routers/favoriteRouter.js";
import reservationRoutes from "./routers/reservationRouter.js";
import cors from "cors";
dotenv.config()
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/menu', menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/reservations", reservationRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Restaurant API is running...');
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

const port=process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});