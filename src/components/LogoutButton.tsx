import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../service/Auth";


const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    

    const handleLogout = () =>{
        logout();
        navigate("/login",{replace: true});
    };
    
    return (
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
        {" "}
        Log Out
      </button>
    );

};

export default LogoutButton