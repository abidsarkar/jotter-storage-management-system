const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Email Verification Code Sender
const sendVerificationEmail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    text: `Your verification code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
};
// Register User
exports.register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
  
    try {
      // Check if email is already used
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "Email is already registered" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        verificationCode,
      });
  
      await newUser.save();
      await sendVerificationEmail(email, verificationCode);
  
      res.status(201).json({ msg: "User registered, verify your email" });
    } catch (error) {
      res.status(500).json({ msg: "Server error, please try again" });
    }
  };
  

// Verify Email
exports.verifyEmail = async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.verificationCode !== code) return res.status(400).json({ msg: "Invalid code" });

  user.isVerified = true;
  user.verificationCode = null;
  await user.save();

  res.status(200).json({ msg: "Email verified successfully" });
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ msg: "Invalid credentials" });

  if (!user.isVerified) return res.status(403).json({ msg: "Verify your email first" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ token, msg: "Login successful" });
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ msg: "User not found" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ msg: "Password reset successful" });
};
