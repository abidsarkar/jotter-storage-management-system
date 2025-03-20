import React, { useState } from 'react';
import { useResetPasswordMutation } from '../../store/api';
import { useNavigate, useLocation } from 'react-router';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Retrieve email

  if (!email) {
    console.error("No email provided for password reset.");
    return <p className="text-red-600 text-center">Invalid request. No email found.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await resetPassword({ email, newPassword, confirmPassword }).unwrap();
      console.log('Password reset successful:', response);
      navigate('/login');
    } catch (err) {
      setError(err?.data?.message || "Password reset failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Reset Your Password</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;