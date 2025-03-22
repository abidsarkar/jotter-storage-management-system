import React from 'react';
const GoogleLoginButton = () => {
 

  const handleGoogleLogin = () => {
    // Redirect to the Google login endpoint
    window.location.href = `${import.meta.env.VITE_BASE_URL_AUTH}/google`;
  };

  

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