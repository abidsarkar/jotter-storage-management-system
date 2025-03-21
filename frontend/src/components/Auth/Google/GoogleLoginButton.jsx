import React from 'react';
import { useGetUserQuery } from '../../../store/api';


const GoogleLoginButton = () => {
  const { data, isLoading, isError } = useGetUserQuery();

  const handleGoogleLogin = () => {
    // Redirect to the Google login endpoint
    window.location.href = `${import.meta.env.VITE_BASE_URL}/google`;
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading Google login</p>;

  return (
    <button
      onClick={handleGoogleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
    >
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;