const express = require("express");
const connectDB = require("./auth/config/db");
const authRoutes = require("./auth/routes/authRoutes");

require("dotenv").config();
connectDB();

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}` ));
