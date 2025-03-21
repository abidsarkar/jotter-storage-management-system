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
    res.redirect("/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.redirect("/");
  });
});
router.get("/user",(req,res)=>{
  res.json(req.user || null);
})
module.exports = router;
