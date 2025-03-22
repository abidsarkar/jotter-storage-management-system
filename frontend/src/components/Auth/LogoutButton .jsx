import React from 'react';
import { useNavigate } from 'react-router'; // Use 'react-router-dom' instead of 'react-router'
import { useLogoutMutation } from '../../store/api';

const LogoutButton = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      // Call the logout mutation
      await logout().unwrap();

      // Redirect to the home page after successful logout
      navigate('/');

      // Refresh the page to reset the application state
      window.location.reload();
    } catch (err) {
      console.error('Logout failed:', err);
      // Optionally, show an error message to the user
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutButton;