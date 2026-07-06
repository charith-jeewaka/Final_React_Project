import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../service/Auth";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        cursor: "pointer",
      }}
      className="bg-red-600
        hover:bg-red-700
        text-white
        px-4 py-2
        rounded-md
        transition"
    >
      {" "}
      Log Out
    </button>
  );
};

export default LogoutButton;
