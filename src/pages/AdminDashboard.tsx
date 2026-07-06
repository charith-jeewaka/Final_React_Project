import React from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard: React.FC = () => {

  return (
    <div className="flex">
      <AdminNavbar />
      <main className="flex-1 p-10 bg-zinc-100 min-h-screen">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      </main>
    </div>
  );
};

export default AdminDashboard;
