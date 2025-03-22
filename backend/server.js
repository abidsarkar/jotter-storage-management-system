const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js")
const fileRoutes = require("./routes/fileRoutes.js")
const favoriteRoutes = require("./routes/favoriteRoutes.js")
const passport = require("./config/passport.js");
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


app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/profile', profileRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
