<<<<<<< HEAD
# 🍽️ RestroHub - Restaurant MERN Web Application

A production-ready, full-stack restaurant management platform built with Node.js, Express, MongoDB, and React. Features an intuitive **Customer Portal** for browsing menus, managing cart/favorites, table reservations, and Stripe payments, alongside a powerful **Admin Dashboard** for live order tracking, menu management, and analytics.

---

## 🚀 Live Demo & Deployment

- 🌐 **Frontend App (Netlify)**: [Live Frontend](https://restromaniahub.netlify.app/)
- ⚙️ **Backend API (Render)**: `http://localhost:5000/api`

---

## 🛠️ Tech Stack

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js (ES Modules)
- **Database**: MongoDB Atlas via Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt password hashing
- **Payments**: Stripe PaymentIntents API
- **Environment**: Dotenv

### **Frontend**
- **UI Library**: React.js (v19)
- **Styling**: Tailwind CSS & PostCSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Context API (`AuthContext`, `CartContext`, `FavoritesContext`, `ReservationContext`)
- **Notifications**: React Toastify
- **Media CDN**: Cloudinary

---

## ✨ Key Features

### 👤 Customer Experience
- 🔐 **Authentication**: User sign-up, secure login, and JWT-based session persistence.
- 🍔 **Menu Browsing**: Search & filter food items by category (Appetizers, Main Course, Fast Food, Desserts, Beverages).
- 🛒 **Cart & Favorites**: Add items to cart with dynamic quantity controls and favorite items bookmarking.
- 💳 **Stripe Checkout**: Integrated card payment flow using Stripe.
- 📅 **Table Reservation**: Reserve tables online with date, time, and guest capacity selection.
- ⭐ **Reviews & Ratings**: Submit ratings and feedback for ordered items.

### 🛡️ Admin Dashboard
- 📊 **Real-time Analytics**: Total users, total orders, menu counts, reviews, and reservation statistics.
- 🍲 **Menu Management**: Add, update, or delete menu items with Cloudinary image uploads.
- 🚚 **Order Status Management**: Update live order workflow (`Pending` → `Preparing` → `Delivered` → `Cancelled`).
- 📋 **Reservation Oversight**: View and manage customer table reservations.

---

## 📁 Project Structure

```text
restorant_app/
├── backend/
│   ├── config/             # Database connection (db.js)
│   ├── controllers/        # User, Menu, Order, Cart, Review, Favorite & Reservation controllers
│   ├── middleware/         # Auth & Admin role verification middleware
│   ├── models/             # Mongoose Schemas (User, Menu, Order, Cart, Review, Favorite, Reservation)
│   ├── routers/            # Express API routes
│   ├── .env                # Environment variables
│   └── index.js            # Express server entry point
│
└── frontend/
    ├── public/             # Static assets & _redirects for Netlify
    ├── src/
    │   ├── api/            # Central Axios configuration
    │   ├── components/     # Navbar, Footer, Toast notifications
    │   ├── context/        # Auth, Cart, Favorites & Reservation React Contexts
    │   ├── pages/
    │   │   ├── admin/      # Admin Dashboard, Menu, Orders, Reviews & Reservations
    │   │   └── customer/   # Home, Menu, Cart, Checkout, Orders & Reservations
    │   ├── App.js          # App routes & layout
    │   └── index.js        # React DOM entry point
    └── .env                # Frontend environment variables
```

---

## ⚡ Getting Started (Local Development)

### 1. Prerequisites
- **Node.js**: `v18+` or `v20+`
- **MongoDB Atlas Account**: [Create free account](https://www.mongodb.com/cloud/atlas)
- **Stripe Account**: [Get Test API Keys](https://dashboard.stripe.com/apikeys)
- **Cloudinary Account**: [Get Cloudinary Preset](https://cloudinary.com)

---

### 2. Environment Setup

#### **Backend `.env`** (`backend/.env`):
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/restorant_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
STRIPE_SECRET_KEY=sk_test_51...
```

#### **Frontend `.env`** (`frontend/.env`):
```env
REACT_APP_API_URL=http://localhost:5000/api
CI=false
```

---

### 3. Installation & Running

#### **Run Backend**:
```powershell
cd backend
npm install
npm run dev
```
*Backend server starts at `http://localhost:5000`*

#### **Run Frontend**:
```powershell
cd frontend
npm install
npm start
```
*Frontend React app starts at `http://localhost:3000`*

---

## 🔒 Security Best Practices Implemented

1. **Password Hashing**: Passwords are never stored in plain text; salted with `bcrypt` (10 rounds).
2. **Encrypted Transit**: Full HTTPS SSL encryption across production deployments (Netlify & Render).
3. **Role-Based Access Control (RBAC)**: Protected admin endpoints guarded by `authMiddleware` and `isAdmin` middleware.
4. **JWT Verification**: Token signature checked on every protected endpoint (`Bearer <token>`).

---

## 📜 License

This project is open source under the [ISC License](LICENSE).
=======
🍽️ Restaurant MERN WebApp

A full-stack restaurant management and food ordering application built with the MERN stack. It provides a user-friendly interface for customers and an admin dashboard for managing menus, orders, users, and restaurant operations.

🚀 Live Demo

Restaurant WebApp

✨ Features

* User registration and JWT authentication
* Role-based access control
* Browse and search food items
* Add items to cart and place orders
* Online payment integration
* Real-time order tracking with Socket.io
* Admin dashboard
* Menu and inventory management
* Order management
* Redis caching
* Responsive UI

🛠️ Tech Stack

Frontend: React.js, Redux, Tailwind CSS, Axios, Socket.io

Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt

Other: Redis, Git, GitHub, Netlify

📁 Project Structure

Restaurant_app/
├── frontend/     # React application
├── backend/      # Node.js + Express API
├── docs/         # Project screenshots
└── README.md

⚙️ Installation

1. Clone the repository

git clone https://github.com/Ashish7103/Resturant_app.git
cd Resturant_app

2. Install Backend

cd backend
npm install
npm start

3. Install Frontend

Open another terminal:

cd frontend
npm install
npm start

🔐 Environment Variables

Create a .env file inside the backend folder:

PORT=5000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
REDIS_URL=your_redis_url

📌 Main Modules

* Authentication & Authorization
* Restaurant Menu
* Shopping Cart
* Orders
* Payments
* Admin Dashboard
* Real-time Notifications
* Inventory Management

👨‍💻 Author

Ashish Singh

GitHub: Ashish7103

⸻

⭐ If you find this project useful, consider giving it a star!
>>>>>>> 429e3584f8dca9c334eef49ebd63a3be3813e47c
