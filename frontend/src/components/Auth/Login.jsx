import React, { useState } from 'react';
import { useLoginMutation } from '../../store/api';
import { useNavigate } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  // Handle email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      console.log('Login successful:', response);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  // Handle Google OAuth login
  const handleGoogleLogin = () => {
    // Redirect the user to the backend Google OAuth endpoint
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Login to Jotter</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <button
        onClick={() => navigate('/forgot-password')}
        className="text-blue-600 text-sm mt-4"
      >
        Forgot Password?
      </button>
      <button
        onClick={() => navigate('/signup')}
        className="text-blue-600 text-sm mt-2"
      >
        Don't have an account? Sign Up
      </button>

      {/* Google OAuth Button */}
      <button
        onClick={handleGoogleLogin}
        className="w-full max-w-xs bg-red-600 text-white p-2 rounded-lg mt-4 hover:bg-red-700 transition duration-300"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;