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
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allow frontend requests
//google login
app.use(cors({ origin: process.env.GOOGLE_CLIENT_ID, credentials: true }));
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
      },
    })
  );

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
