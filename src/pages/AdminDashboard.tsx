import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../service/Auth";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome to the control center.</p>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#dc3545",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default AdminDashboard;
