import React from "react";
import LogoutButton from "../../components/LogoutButton";

const UserDashboard: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>User Dashboard</h2>
      <p>Welcome back to your workspace.</p>

      <LogoutButton />
    </div>
  );
};

export default UserDashboard;
