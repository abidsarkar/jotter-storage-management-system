import React, { useState } from "react";
import { useVerifyEmailMutation } from "../../store/api"; 
import { useNavigate, useLocation } from "react-router";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await verifyEmail({ email, code: otp }).unwrap();
      console.log("Email verified successfully:", response);
      navigate("/login");
    } catch (err) {
      setError(err?.data?.message || "Email verification failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Verify Your Email</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </button>
      </form>
      <button
        onClick={() => navigate("/login")}
        className="text-blue-600 text-sm mt-4"
      >
        Back to Login
      </button>
    </div>
  );
};

export default VerifyEmail;
