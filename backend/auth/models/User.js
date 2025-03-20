const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  googleId: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String }, // Email verification code
  resetOTP: { type: String }, // OTP for password reset
  resetOTPExpires: { type: Date }, // Expiration time for OTP
  isOTPVerified: { type: Boolean, default: false }, // Track OTP verification
});

module.exports = mongoose.model("User", UserSchema);
