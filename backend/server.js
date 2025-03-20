const express = require("express");
const cors = require("cors");
const connectDB = require("./auth/config/db");
const authRoutes = require("./auth/routes/authRoutes");
require("dotenv").config();

// Connect to Database
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allow frontend requests
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
