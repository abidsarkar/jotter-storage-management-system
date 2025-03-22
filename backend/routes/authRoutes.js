const express = require("express");

const {
  register,
  verifyEmail,
  login,
  requestPasswordReset,
  verifyResetOTP,
  resetPassword,
  getUserProfile,
  changePassword,
  logout,
} = require("../controllers/auth/authController");
const { googleLogin, googleCallback } = require("../controllers/auth/googleAuthControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Email/Password Authentication
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/request-reset", requestPasswordReset);
router.post("/verify-otp", verifyResetOTP);
router.post("/reset-password", resetPassword);
router.post("/change-password", authMiddleware, changePassword);
router.get("/profile", authMiddleware, getUserProfile);

// Google Authentication

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

// Logout
router.get("/logout", logout);

module.exports = router;