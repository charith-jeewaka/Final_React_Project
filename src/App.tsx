// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";

import UserDashboard from "./pages/user/UserDashboard";
import MyOrders from "./pages/user/MyOrders";
import Shop from "./pages/user/Shop";
import Profile from "./pages/user/Profile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Items from "./pages/admin/Items";
import Orders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
import Reports from "./pages/admin/Reports";
import Emails from "./pages/admin/Emails";

import ProtectedRoute from "./components/common/ProtectedRout";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

import { isLoggedIn } from "./service/TokenService";

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
          { <Route path="shop" element={<Shop />} />}
          { <Route path="orders" element={<MyOrders />} /> }
          {/* <Route path="wishlist" element={<Wishlist />} /> */}
          { <Route path="profile" element={<Profile />} /> }
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
          <Route path="items" element={<Items />} />

          {/* Future pages */}
          {<Route path="orders" element={<Orders />} />}
          {<Route path="customers" element={<Customers />} />}
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
