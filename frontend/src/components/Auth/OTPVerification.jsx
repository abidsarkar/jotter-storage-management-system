import React, { useState } from 'react';
import { useVerifyResetOTPMutation } from "../../store/api";
import { useNavigate, useLocation } from 'react-router';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [verifyResetOTP, { isLoading }] = useVerifyResetOTPMutation();
  const navigate = useNavigate();
  const location = useLocation(); // Get email from navigation state
  const email = location.state?.email; // Retrieve email

  if (!email) {
    console.error("No email provided for OTP verification.");
    return <p className="text-red-600 text-center">Invalid request. No email found.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyResetOTP({ email, otp }).unwrap();
      console.log('OTP verified:', response);
      navigate('/reset-password', { state: { email } }); // Pass email to the next page
    } catch (err) {
      console.error('OTP verification failed:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">OTP Verification</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
};

export default OTPVerification;