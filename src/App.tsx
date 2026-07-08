// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";

import UserDashboard from "./pages/user/UserDashboard";
import MyOrders from "./pages/user/MyOrders";
import Profile from "./pages/user/Profile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProducts from "./pages/admin/AddProducts";
import Orders from "./pages/admin/Orders";
import Inventory from "./pages/admin/Inventory";
import Reports from "./pages/admin/Reports";
import Emails from "./pages/admin/Emails";

import ProtectedRoute from "./components/common/ProtectedRout";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

import { isLoggedIn } from "./service/TokenService";
import EditProduct from "./pages/admin/EditProduct";
import UserCart from "./pages/user/UserCart";
import Checkout from "./pages/user/Checkout";
import OrderDetails from "./pages/user/OrderDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root */}
        <Route
          path="/"
          element={
            isLoggedIn() ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ===========================
            User Section
           =========================== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />

          {/* Future pages */}
          {<Route path="checkout" element={<Checkout />} />}

          {<Route path="userCart" element={<UserCart />} />}
          {<Route path="myOrders" element={<MyOrders />} />}
          {<Route path="profile" element={<Profile />} />}
        </Route>

        {/* ===========================
            Admin Section
           =========================== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* /admin */}
          <Route index element={<AdminDashboard />} />

          {/* /admin/items */}
          <Route path="addProducts" element={<AddProducts />} />

          {/* Future pages */}
          {<Route path="orders" element={<Orders />} />}
          <Route path="myOrders/:id" element={<OrderDetails />} />
          {<Route path="inventory" element={<Inventory />} />}
          <Route path="inventory/edit/:id" element={<EditProduct />} />
          {<Route path="reports" element={<Reports />} />}
          {<Route path="emails" element={<Emails />} />}
          {/* <Route path="employees" element={<Employees />} /> */}
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
