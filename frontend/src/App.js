import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerHome from './pages/customer/CustomerHome';
import Toast from './components/Toast';
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from './components/AdminLayout';
import Layout from './components/Layout';
import Menu from './pages/admin/Menu';
import Orders from './pages/admin/Orders';
import Reservations from './pages/admin/Reservations';
import { MenuProvider } from './pages/admin/contex/MenuContext';
import Dashboard from './pages/admin/Dashboard';
import CustomerMenu from './pages/customer/CustomerMenu';
import CustomerReservations from './pages/customer/CustomerReservations';
import CustomerOrders from './pages/customer/CustomerOrders';
import CustomerCard from './pages/customer/CustomerCard';
import { CartProvider } from './pages/customer/context/CartContext';
import CustomerCheckout from './pages/customer/CustomerCheckout';
import { FavoritesProvider } from './pages/customer/context/FavoritesContext';
import CustomerFavorites from './pages/customer/CustomerFavorites';
import { ReservationProvider } from './pages/customer/context/ReservationContext';
import Review from './pages/admin/Review';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={
              <MenuProvider>
                <AdminLayout />
              </MenuProvider>
            }
          >
            <Route
              path="/admin/menu"
              element={
                <ProtectedRoute role="admin">
                  <Menu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute role="admin">
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reservations"
              element={
                <ProtectedRoute role="admin">
                  <Reservations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <ProtectedRoute role="admin">
                  <Review />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={
            <CartProvider>
              <FavoritesProvider>
                  <ReservationProvider>
                  <Layout />
                  </ReservationProvider>
              </FavoritesProvider>
            </CartProvider>
          }>
            <Route
              path="/customer"
              element={
                <ProtectedRoute role="customer">
                  <CustomerHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/favorites"
              element={
                <ProtectedRoute role="customer">
                  <CustomerFavorites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/menu"
              element={
                <ProtectedRoute role="customer">
                  <CustomerMenu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/cart"
              element={
                <ProtectedRoute role="customer">
                  <CustomerCard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/reservations"
              element={
                <ProtectedRoute role="customer">
                  <CustomerReservations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/orders"
              element={
                <ProtectedRoute role="customer">
                  <CustomerOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/checkout"
              element={
                <ProtectedRoute role="customer">
                  <CustomerCheckout />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
      <Toast.Container />
    </>
  );
}

export default App;
