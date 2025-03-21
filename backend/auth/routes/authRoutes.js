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
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//  Google OAuth Callback (Handles Redirect from Google)
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.redirect("http://localhost:5173/dashboard"); // Redirect after setting the cookie
  }
);
// Google logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });

    res.clearCookie("token", { path: "/", httpOnly: true, sameSite: "Lax" });

    return res.status(200).json({ message: "Logged out successfully" });
  });
});

// Fetch logged-in user's information
router.get("/user", authMiddleware, (req, res) => {
  // req.user is attached by authMiddleware after verifying the token
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    profilePicture: req.user.profilePicture,
  });
});

module.exports = router;
