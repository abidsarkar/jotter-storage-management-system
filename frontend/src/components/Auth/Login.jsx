import React, { useState, useEffect } from 'react';
import { useGetUserQuery, useLoginMutation } from '../../store/api';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import GoogleLoginButton from './Google/GoogleLoginButton'; // Import Google login button

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const navigate = useNavigate();

  // Fetch user data
  const { data: user, isLoading: isUserLoading, isError } = useGetUserQuery();

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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

  // Show loading state while checking user authentication
  if (isUserLoading) {
    return <div>Loading...</div>; // Replace with your preferred loading UI
  }

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
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <button
          type="submit"
          disabled={isLoginLoading}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {isLoginLoading ? 'Logging in...' : 'Login'}
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

      {/* Google OAuth Button Component */}
      <GoogleLoginButton />
    </div>
  );
};

export default Login;