const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    tags: [String],
    publishedAt: { type: Date, default: Date.now },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
