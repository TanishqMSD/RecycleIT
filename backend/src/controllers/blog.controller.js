import Blog from "../models/blog.model.js";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, description, content, banner, tags } = req.body;
    
    // Validate required fields
    if (!title || !description || !content || !banner) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new Blog({
      title,
      description,
      content,
      banner,
      tags: tags || [],
      author: req.user._id, // From auth middleware
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all blogs (with pagination)
export const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const blogs = await Blog.find({ status: "published" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "username");
    
    const total = await Blog.countDocuments({ status: "published" });
    
    res.status(200).json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "username")
      .populate("comments.user", "username");
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog
export const updateBlog = async (req, res) => {
  try {
    const { title, description, content, banner, tags, status } = req.body;
    
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    // Check if the user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this blog" });
    }
    
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.content = content || blog.content;
    blog.banner = banner || blog.banner;
    blog.tags = tags || blog.tags;
    blog.status = status || blog.status;
    
    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    // Check if the user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this blog" });
    }
    
    await blog.remove();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like a blog
export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    // Check if the blog has already been liked by the user
    if (blog.likes.includes(req.user._id)) {
      // Unlike the blog
      blog.likes = blog.likes.filter(
        (like) => like.toString() !== req.user._id.toString()
      );
    } else {
      // Like the blog
      blog.likes.push(req.user._id);
    }
    
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a comment to a blog
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }
    
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    const comment = {
      user: req.user._id,
      text,
    };
    
    blog.comments.push(comment);
    await blog.save();
    
    const updatedBlog = await Blog.findById(req.params.id).populate(
      "comments.user",
      "username"
    );
    
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get blogs by user
export const getBlogsByUser = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).sort({
      createdAt: -1,
    });
    
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};