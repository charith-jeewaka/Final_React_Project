// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";

import UserDashboard from "./pages/user/UserDashboard";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Items from "./pages/admin/Items";
import Orders from "./pages/admin/Orders"

import ProtectedRoute from "./components/ProtectedRout";
import AdminLayout from "./layouts/AdminLayout";

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

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

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
          {/* <Route path="customers" element={<Customers />} /> */}
          {/* <Route path="reports" element={<Reports />} /> */}
          {/* <Route path="emails" element={<Emails />} /> */}
          {/* <Route path="employees" element={<Employees />} /> */}
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
