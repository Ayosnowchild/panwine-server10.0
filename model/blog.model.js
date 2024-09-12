const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    blogTitle: { type: String, required: true },
    blogContent: { type: String, required: true },
    image: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
