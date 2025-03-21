const express = require("express");
const cors = require("cors");
const connectDB = require("./auth/config/db");
const authRoutes = require("./auth/routes/authRoutes");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("./auth/config/passport.js");
require("dotenv").config();

// Connect to Database
connectDB();

const app = express();

// Fix CORS issues
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend requests
    credentials: true, // Allow cookies & session
  })
);

app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// Session middleware
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // Your MongoDB connection URI
        ttl: 14 * 24 * 60 * 60, // Session expiration time (14 days)
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production", // Ensure cookies are only sent over HTTPS in production
      },
    })
  );

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
