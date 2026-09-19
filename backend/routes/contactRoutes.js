const express = require("express");
const rateLimit = require("express-rate-limit");
const { submitContactRequest } = require("../controllers/contactController");

const router = express.Router();

// Basic spam/abuse protection: max 5 submissions per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many requests sent. Please call or text us if this is urgent.",
  },
});

router.post("/", contactLimiter, submitContactRequest);

module.exports = router;
