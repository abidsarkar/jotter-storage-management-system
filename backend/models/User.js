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
  profilePicture:{type:String,default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"},
  storageLimit: { type: Number, default: 1 * 1024 * 1024 * 1024 },  
  usedStorage: { type: Number, default: 0 },  

}, {
  timestamps: true,
});
module.exports = mongoose.model("User", UserSchema);
