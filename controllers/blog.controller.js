const Blog = require("../model/blog.model");
const { User } = require("../model/user.model");

async function createBlog(req, res) {
  try {
    let blog = new Blog(req.body);
    await blog.save();
    res.status(201).json({ message: "blog created successfully", blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
}

async function fetchBlogById(req, res) {
  try {
    let blog = await Blog.findById(req.params.id).populate({
      path: "author",
      select: "fullname",
    });
    res.status(200).json({ message: "blog fetched", blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
}

async function fetchAllBlog(req, res) {
  try {
    let blogs = await Blog.find();
    res.status(200).json({ message: "blog fetched", blogs }).populate("author");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
}

async function fetchUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).populate("blogs");
    // const allBlogs = await Blog.find()
    // blogs = allBlogslogs.filter((blog) => blog.author.id == user.id)
    res.status(200).json({ message: "user fetched", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
}

module.exports = { createBlog, fetchAllBlog, fetchBlogById, fetchUserById };
