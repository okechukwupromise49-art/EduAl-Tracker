const dotenv = require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require("mongoose")
const app = express();

const gpaRoutes = require("./routes/gpa");
const registerRoutes = require("./routes/register");
const cgpaRoutes = require("./routes/cgpa");
const notificationRoutes = require("./routes/notification");
const cookieParser = require("cookie-parser");

const PORT = 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  if (err.name === "MulterError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.message === "Only images allowed") {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));

// Test Route
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend is running 🚀",
    cloudinary: process.env.CLOUDINARY_API_KEY ? "✅ Configured" : "❌ Missing API Key"
  });
});

console.log(process.env.CLOUDINARY_API_KEY);
console.log("KEY:", process.env.CLOUDINARY_API_KEY);
console.log("NAME:", process.env.CLOUDINARY_CLOUD_NAME);

app.use("/api/gpa", gpaRoutes);
app.use("/api/auth", registerRoutes);
app.use("/api/cgpa", cgpaRoutes);
app.use("/api/notification", notificationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});