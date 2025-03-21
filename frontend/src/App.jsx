import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router';
import { useGetUserQuery } from './store/api'; // Import the hook

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Home';
import ForgotPassword from './components/Auth/ForgotPassword';
import OTPVerification from './components/Auth/OTPVerification';
import ResetPassword from './components/Auth/ResetPassword';
import VerifyEmail from './components/Auth/VerifyEmail';
import Dashboard from './components/Dashboard';

// ProtectedRoute Component: Restricts access to authenticated users
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" replace />;
  }
  return children;
};

// PublicRoute Component: Restricts access to unauthenticated users
const PublicRoute = ({ user, children }) => {
  if (user) {
    // Redirect to dashboard if the user is already authenticated
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUserQuery();

  // Show a loading spinner while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicRoute user={user}>
            <Home/>
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute user={user}>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute user={user}>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute user={user}>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/otp-verification"
        element={
          <PublicRoute user={user}>
            <OTPVerification />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute user={user}>
            <ResetPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/verify-email"
        element={
          <PublicRoute user={user}>
            <VerifyEmail />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;