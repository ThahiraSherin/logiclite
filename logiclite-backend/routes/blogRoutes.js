const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const { authMiddleware } = require("../middleware/auth");

// Increment blog view count
router.post("/:id/view", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error updating views" });
  }
});

// Increment blog like count
router.post("/:id/like", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error updating likes" });
  }
});

module.exports = router;
