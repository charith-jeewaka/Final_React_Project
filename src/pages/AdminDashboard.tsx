import React from "react";
import LogoutButton from "../components/LogoutButton";

const AdminDashboard: React.FC = () => {

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome to the control center.</p>

    <LogoutButton />

    </div>
  );
};

export default AdminDashboard;
