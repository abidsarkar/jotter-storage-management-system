import React from 'react';
import { useNavigate } from 'react-router';

const OTPVerification = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">OTP Verification</h1>
      <input
        type="text"
        placeholder="Enter 6-digit OTP"
        className="w-full max-w-xs p-2 mb-4 border border-gray-300 rounded-lg"
      />
      <button
        onClick={() => navigate('/reset-password')}
        className="w-full max-w-xs bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Verify
      </button>
    </div>
  );
};

export default OTPVerification;