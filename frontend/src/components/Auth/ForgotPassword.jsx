import React, { useState } from 'react';
import { useRequestPasswordResetMutation } from '../../store/api';
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [requestPasswordReset, { isLoading }] = useRequestPasswordResetMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestPasswordReset({ email }).unwrap();
      console.log('OTP sent:', response);
      navigate('/otp-verification');
    } catch (err) {
      console.error('Failed to send OTP:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {isLoading ? 'Sending OTP...' : 'Get Verification Code'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;