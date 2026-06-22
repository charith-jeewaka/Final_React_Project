// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register"; // Make sure the path matches where you put your Register file
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Root path automatically redirects users straight to register page */}
        <Route path="/" element={<Navigate to="/register" replace />} />

        {/* 2. Explicit Auth Route path definitions */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 3. Catch-all fallback route: Redirects broken URLs back to register */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
