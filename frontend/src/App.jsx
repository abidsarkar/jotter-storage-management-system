import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './components/Home'
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import OTPVerification from './components/Auth/OTPVerification';
import ResetPassword from './components/Auth/ResetPassword';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      </>
  );
}

export default App;