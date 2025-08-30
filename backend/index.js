// backend/index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/connectDB/db");

// env
dotenv.config();

// app
const app = express();
const PORT = process.env.PORT || 5000;

// db
connectDB();

// middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// лог для отладки
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// routes
const authRoutes = require("./src/routes/auth.route.js");
app.use("/auth", authRoutes);

// healthcheck
app.get("/", (_req, res) => res.send("Server is running ✅"));

// 404 (чтобы видеть, если путь не совпал)
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
