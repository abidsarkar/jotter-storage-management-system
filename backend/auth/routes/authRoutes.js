const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { register, verifyEmail, login, resetPassword } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Email/Password Authentication
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
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
    const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
    // Generate a JWT token for authenticated user
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: thirtyDaysInSeconds });

    // Redirect with token (modify as needed for frontend compatibility)
    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  }
);

// Protected Route (Requires Authentication)
router.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({ msg: `Welcome, user ID: ${req.user.userId}` });
});

module.exports = router;
