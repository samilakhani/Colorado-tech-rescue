const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// These read straight from JSON files in /backend/data so the business owner
// (or a future admin panel) can update reviews/gallery content without
// touching any React code or redeploying the frontend.

router.get("/reviews", (req, res) => {
  const filePath = path.join(__dirname, "..", "data", "reviews.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ success: false, message: "Could not load reviews." });
    res.json(JSON.parse(data));
  });
});

router.get("/gallery", (req, res) => {
  const filePath = path.join(__dirname, "..", "data", "gallery.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ success: false, message: "Could not load gallery." });
    res.json(JSON.parse(data));
  });
});

module.exports = router;
