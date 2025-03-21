import React from 'react';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full max-w-xs bg-red-600 text-white p-2 rounded-lg mt-4 hover:bg-red-700 transition duration-300"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
