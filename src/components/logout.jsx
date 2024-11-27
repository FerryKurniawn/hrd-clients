import React from "react";
import { useNavigate } from "react-router-dom";
export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-main text-text font-bold py-1.5 px-3 rounded-sm border-2 border-border shadow-light transition-transform transform hover:scale-105"
    >
      Logout
    </button>
  );
}
