import React from 'react';
import { Routes, Route, Navigate } from 'react-router';

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Home';
import ForgotPassword from './components/Auth/ForgotPassword';
import OTPVerification from './components/Auth/OTPVerification';
import ResetPassword from './components/Auth/ResetPassword';
import VerifyEmail from './components/Auth/VerifyEmail';
import Dashboard from './components/Dashboard';
import ProfileMain from './components/profile/ProfileMain';
import ProfileSetting from './components/profile/ProfileSetting';
import ProfileEdit from './components/profile/ProfileEdit';
import ProfileSupport from './components/profile/ProfileSupport';
import ChangePassword from './components/profile/profileSettings/ChangePassword';


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-verification" element={<OTPVerification />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* Dashboard Route */}
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Fallback Route */}
      {/* <Route path="/folder" element={<Folder />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/calendar-search" element={<CalendarSearch />} />
        */}
        <Route path="/profile" element={<ProfileMain />} /> 
        <Route path="/profileSetting" element={<ProfileSetting />} /> 
        <Route path="/profileEdit" element={<ProfileEdit />} /> 
        <Route path="/ProfileSupport" element={<ProfileSupport />} /> 
        <Route path="/passwordChange" element={<ChangePassword />} /> 
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
