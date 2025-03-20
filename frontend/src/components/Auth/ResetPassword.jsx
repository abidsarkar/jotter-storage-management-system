import React from 'react';
import { useNavigate } from 'react-router';

const ResetPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Reset Your Password</h1>
      <input
        type="password"
        placeholder="New Password"
        className="w-full max-w-xs p-2 mb-4 border border-gray-300 rounded-lg"
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        className="w-full max-w-xs p-2 mb-4 border border-gray-300 rounded-lg"
      />
      <button
        onClick={() => navigate('/login')}
        className="w-full max-w-xs bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;