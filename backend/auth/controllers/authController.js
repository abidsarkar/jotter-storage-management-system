const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const passport = require("passport")
require("dotenv").config();

// 📧 Email Sender Function
const sendEmail = async (email, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

// 📌 Load Email Templates
const loadTemplate = (templateName, replacements) => {
  let templatePath = path.join(
    __dirname,
    "../emailTemplate",
    `${templateName}.html`
  );
  let emailTemplate = fs.readFileSync(templatePath, "utf8");

  Object.keys(replacements).forEach((key) => {
    emailTemplate = emailTemplate.replace(`{{${key}}}`, replacements[key]);
  });

  return emailTemplate;
};
// 🔹 Register User
exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return res.status(400).json({ msg: "Passwords do not match" });
  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 6 characters long" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "Email is already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationCode,
    });

    await newUser.save();

    // Load & send verification email
    const emailContent = loadTemplate("verificationTemplate", {
      VERIFICATION_CODE: verificationCode,
    });
    await sendEmail(email, "Verify Your Email - Jotter Storage", emailContent);

    res.status(201).json({ msg: "User registered, verify your email" });
  } catch (error) {
    res.status(500).json({ msg: "Server error, please try again" });
  }
};
// 🔹 Verify Email
exports.verifyEmail = async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.verificationCode !== code)
    return res
      .status(400)
      .json({ msg: "Invalid or expired verification code" });

  user.isVerified = true;
  user.verificationCode = null;
  await user.save();
  // Generate a JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email }, // Payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: "1h" } // Token expiration
  );
  // Send the token as a cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "Lax",
    maxAge: 3600000, // 1 hour
  });
  // Load & send confirmation email
  const emailContent = loadTemplate("confirmationTemplate", {
    USERNAME: user.username,
  });
  await sendEmail(
    email,
    "Your Account is Verified - Jotter Storage",
    emailContent
  );

  res.status(200).json({ msg: "Email verified successfully" });
};

// 🔹 Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ msg: "Invalid email or password" });

  if (!user.isVerified)
    return res.status(403).json({ msg: "Verify your email before logging in" });

  // 3. Generate a JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email }, // Payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: "30d" } // Token expiration
  );

  // 4. Send the token to the client
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "Lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ token, msg: "Login successful" });
};

// 🔹 Request Password Reset (Send OTP)
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email || typeof email !== "string") {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  const trimmedEmail = email.trim(); // Trim the email
  const user = await User.findOne({ email: trimmedEmail });

  if (!user) return res.status(404).json({ msg: "User not found" });

  // Generate a 6-digit OTP
  const resetOTP = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetOTP = resetOTP;
  user.resetOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes
  await user.save();

  // Load & send OTP email
  const emailContent = loadTemplate("resetPasswordTemplate", {
    RESET_OTP: resetOTP,
  });
  await sendEmail(
    trimmedEmail,
    "Reset Your Password - Jotter Storage",
    emailContent
  );

  res.status(200).json({ msg: "OTP sent to email. Valid for 10 minutes." });
};
// 🔹 Verify OTP for Password Reset
exports.verifyResetOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ msg: "User not found" });

  if (user.resetOTP !== otp)
    return res.status(400).json({ msg: "Invalid OTP" });

  if (new Date() > user.resetOTPExpires)
    return res.status(400).json({ msg: "OTP expired" });

  user.isOTPVerified = true;
  await user.save();
  res.status(200).json({ msg: "OTP verified. Proceed to reset password." });
};

// 🔹 Reset Password (After OTP Verification)
exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ msg: "User not found" });

  if (!user.isOTPVerified)
    return res.status(400).json({ msg: "OTP verification required" });

  if (newPassword !== confirmPassword)
    return res.status(400).json({ msg: "Passwords do not match" });

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetOTP = null;
  user.resetOTPExpires = null;
  user.isOTPVerified = false; // Reset OTP status
  await user.save();

  // Generate a JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email }, // Payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: "10d" } // Token expiration
  );
  // Send the token as a cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "Lax",
    maxAge: 10 * 24 * 60 * 60 * 1000, // 1 hour
  });
  res.status(200).json({ msg: "Password reset successful" });
};
// 🔹 Get User Information (After Login)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture || "",
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
// 🔹 Google Login Redirect
exports.googleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

// 🔹 Google OAuth Callback
exports.googleCallback = (req, res, next) => {
  passport.authenticate("google", { failureRedirect: "/" }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ msg: "Google authentication failed" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    // Set the token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    });

    // Redirect to the dashboard
    res.redirect("http://localhost:5173/dashboard");
  })(req, res, next);
};

exports.logout = (req, res) => {
  // Clear the token cookie
  res.clearCookie("token", {
    path: "/", // Ensure the cookie is cleared for all paths
    httpOnly: true, // Match the httpOnly setting used when setting the cookie
    sameSite: "Lax", // Match the sameSite setting used when setting the cookie
    secure: process.env.NODE_ENV === "production", // Match the secure setting used when setting the cookie
  });

  return res.status(200).json({ message: "Logged out successfully" });
};