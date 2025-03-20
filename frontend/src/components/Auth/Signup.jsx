import React from 'react';
import { useNavigate } from 'react-router';

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Create Your Account</h1>
      <input
        type="text"
        placeholder="Username"
        className="w-full max-w-xs p-2 mb-4 border border-gray-300 rounded-lg"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full max-w-xs p-2 mb-4 border border-gray-300 rounded-lg"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full max-w-xs p-2 mb-4 border border-gray-300 rounded-lg"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full max-w-xs p-2 mb-4 border border-gray-300 rounded-lg"
      />
      <div className="flex items-center mb-4">
        <input type="radio" id="terms" className="mr-2" />
        <label htmlFor="terms" className="text-sm text-gray-700">
          I have read and agreed to Jotter's Terms and Conditions
        </label>
      </div>
      <button className="w-full max-w-xs bg-blue-600 text-white p-2 rounded-lg mb-4 hover:bg-blue-700 transition duration-300">
        Sign Up
      </button>
      <button
        onClick={() => navigate('/login')}
        className="text-blue-600 text-sm"
      >
        Already have an account? Login
      </button>
    </div>
  );
};

export default Signup;