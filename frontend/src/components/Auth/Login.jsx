import React from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Login to Jotter</h1>
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
      <button
        onClick={() => navigate('/forgot-password')}
        className="text-blue-600 text-sm mb-4"
      >
        Forgot Password?
      </button>
      <button className="w-full max-w-xs bg-blue-600 text-white p-2 rounded-lg mb-4 hover:bg-blue-700 transition duration-300">
        Login
      </button>
      <button
        onClick={() => navigate('/signup')}
        className="text-blue-600 text-sm mb-4"
      >
        Don't have an account? Sign Up
      </button>
      <button className="w-full max-w-xs bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300">
        Sign Up with Google
      </button>
    </div>
  );
};

export default Login;