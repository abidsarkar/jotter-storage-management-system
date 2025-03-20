import React from 'react';
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Forgot Password</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-full max-w-xs p-2 mb-4 border border-gray-300 rounded-lg"
      />
      <button
        onClick={() => navigate('/otp-verification')}
        className="w-full max-w-xs bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Get Verification Code
      </button>
    </div>
  );
};

export default ForgotPassword;