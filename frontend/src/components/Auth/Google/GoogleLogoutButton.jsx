import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

const GoogleLogoutButton = () => {
  const navigate = useNavigate();

  const handleGoogleLogout = () => {
    Cookies.remove('token'); // Remove token from cookies
    window.location.href = 'http://localhost:5000/api/auth/logout'; // Redirect to logout endpoint
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
