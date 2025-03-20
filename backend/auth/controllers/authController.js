const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
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
  let templatePath = path.join(__dirname, "../emailTemplate", `${templateName}.html`);
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

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "Email is already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationCode,
    });

    await newUser.save();

    // Load & send verification email
    const emailContent = loadTemplate("verificationTemplate", { VERIFICATION_CODE: verificationCode });
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
    return res.status(400).json({ msg: "Invalid or expired verification code" });

  user.isVerified = true;
  user.verificationCode = null;
  await user.save();

  // Load & send confirmation email
  const emailContent = loadTemplate("confirmationTemplate", { USERNAME: user.username });
  await sendEmail(email, "Your Account is Verified - Jotter Storage", emailContent);

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

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ token, msg: "Login successful" });
};

// 🔹 Request Password Reset (Send OTP)
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ msg: "User not found" });

  // Generate a 6-digit OTP
  const resetOTP = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetOTP = resetOTP;
  user.resetOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes
  await user.save();

  // Load & send OTP email
  const emailContent = loadTemplate("resetPasswordTemplate", { RESET_OTP: resetOTP });
  await sendEmail(email, "Reset Your Password - Jotter Storage", emailContent);

  res.status(200).json({ msg: "OTP sent to email. Valid for 10 minutes." });
};

// 🔹 Verify OTP for Password Reset
exports.verifyResetOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ msg: "User not found" });

  if (user.resetOTP !== otp) return res.status(400).json({ msg: "Invalid OTP" });

  if (new Date() > user.resetOTPExpires) return res.status(400).json({ msg: "OTP expired" });

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

  res.status(200).json({ msg: "Password reset successful" });
};
