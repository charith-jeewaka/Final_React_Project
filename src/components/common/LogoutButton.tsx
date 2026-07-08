import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../service/Auth";
import { LogOut } from "lucide-react";

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
      className="flex w-60 items-center justify-center gap-2
    bg-red-600
    hover:bg-red-700
    text-white
    px-4 py-2
    rounded-xl
    transition"
    >
      <LogOut size={20} />

      <span>Log Out</span>
    </button>
  );
};

export default LogoutButton;
