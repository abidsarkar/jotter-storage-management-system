const express = require("express");
const passport = require("passport");
const {
  register,
  verifyEmail,
  login,
  requestPasswordReset,
  verifyResetOTP,
  resetPassword,
  getUserProfile,
  googleLogin,
  googleCallback,
  logout,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Email/Password Authentication
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/request-reset", requestPasswordReset);
router.post("/verify-otp", verifyResetOTP);
router.post("/reset-password", resetPassword);
router.get("/profile", authMiddleware, getUserProfile);

// Google Authentication
router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

// Logout
router.get("/logout", logout);

module.exports = router;