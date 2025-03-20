const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {
  register,
  verifyEmail,
  login,
  requestPasswordReset,
  verifyResetOTP,
  resetPassword,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Email/Password Authentication
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/request-reset", requestPasswordReset); // ✅ Fix: Function name corrected
router.post("/verify-otp", verifyResetOTP); // ✅ New Route: Verify OTP
router.post("/reset-password", resetPassword);

// Google Authentication
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ msg: "Authentication failed" });
    }

    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    // Set token in a secure httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:5173/dashboard"); // Redirect frontend to dashboard
  }
);

// Protected Route (Requires Authentication)
router.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({ msg: `Welcome, user ID: ${req.user.userId}` });
});

module.exports = router;
