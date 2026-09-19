require("dotenv").config();
const express = require("express");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");
const contentRoutes = require("./routes/contentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Allow only known origins in production; allow everything if not configured (local dev convenience)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
  })
);

app.use(express.json({ limit: "5mb" })); // 5mb to allow small base64 photo uploads from the contact form
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "colorado-tech-rescue-api" });
});

app.use("/api/contact", contactRoutes);
app.use("/api/content", contentRoutes);

// Fallback error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Something went wrong on our end. Please call or text us instead." });
});

app.listen(PORT, () => {
  console.log(`Colorado Tech Rescue API running on port ${PORT}`);
});
