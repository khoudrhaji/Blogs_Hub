const express = require("express");
const Post = require("../Models/postModel");
const User = require("../Models/userModel");
const router = express.Router();

// GET /api/posts?limit=10&page=1
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      Post.find()
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("author", "name email"),
      Post.countDocuments(),
    ]);
    res.json({ posts, total, page, limit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// GET single post
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author", "name email");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Create a post
router.post("/", async (req, res) => {
  try {
    const { title, body, author, tags } = req.body;
    if (!title || !body)
      return res.status(400).json({ message: "Title and body are required" });
    // optional: verify author exists
    if (author) {
      const user = await User.findById(author);
      if (!user) return res.status(400).json({ message: "Invalid author id" });
    }
    const post = await Post.create({ title, body, author, tags });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Post.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Post not found" });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Post.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Add a comment
router.post("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, content } = req.body;
    if (!name || !content)
      return res.status(400).json({ message: "name and content are required" });
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const comment = { name, email, content };
    post.comments.push(comment);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Update a comment
router.put("/:postId/comments/:commentId", async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { name, email, content } = req.body;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (name !== undefined) comment.name = name;
    if (email !== undefined) comment.email = email;
    if (content !== undefined) comment.content = content;
    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a comment
router.delete("/:postId/comments/:commentId", async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    comment.remove();
    await post.save();
    res.json({ message: "Comment removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
