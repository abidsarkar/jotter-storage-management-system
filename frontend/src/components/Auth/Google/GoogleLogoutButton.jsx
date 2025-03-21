import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import axios from "axios";

const GoogleLogoutButton = () => {
  const navigate = useNavigate();

  const handleGoogleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true });

      // Remove token from cookies
      Cookies.remove("token");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogout}
      className="w-full max-w-xs bg-gray-600 text-white p-2 rounded-lg mt-4 hover:bg-gray-700 transition duration-300"
    >
      Logout
    </button>
  );
};

export default GoogleLogoutButton;
