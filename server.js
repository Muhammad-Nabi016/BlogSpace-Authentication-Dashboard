const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const Blog = require("./models/Blog");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Temporary in-memory storage
const blogs = [];

// Test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Codomax Blog App Backend is running!"
    });
});

// ==============================
// GET ALL BLOGS
// ==============================

app.get("/api/blogs", async (req, res) => {
  try {
    const allBlogs = await Blog.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      blogs: allBlogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
});



// ==============================
// GET LOGGED-IN USER'S BLOGS
// ==============================

app.get("/api/blogs/my-blogs", authMiddleware, async (req, res) => {
    try {
        const myBlogs = await Blog.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            blogs: myBlogs
        });

    } catch (error) {
        console.error("Error fetching user blogs:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch your blogs"
        });
    }
});


// ==============================
// GET ONE BLOG
// ==============================

app.get("/api/blogs/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog: blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
});

// ==============================
// CREATE BLOG
// ==============================

app.post("/api/blogs", authMiddleware, async (req, res) => {
  try {
    const { title, category, image, content, status } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, category and content are required",
      });
    }

    if (content.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: "Blog content must be at least 20 characters",
      });
    }

    const newBlog = await Blog.create({
    title,
    category,
    image: image || "",
    content,
    status: status || "draft",
    user: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create blog",
    });
  }
});

// ==============================
// UPDATE BLOG
// ==============================

app.put("/api/blogs/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const { title, category, image, content, status } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, category and content are required",
      });
    }

    if (content.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: "Blog content must be at least 20 characters",
      });
    }

    const updatedBlog = await Blog.findOneAndUpdate(
    {
        _id: req.params.id,
        user: req.user.id
    },
      {
        title,
        category,
        image: image || "",
        content,
        status: status || "draft",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update blog",
    });
  }
});

// ==============================
// DELETE BLOG
// ==============================

app.delete("/api/blogs/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const deletedBlog = await Blog.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
});

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete blog",
    });
  }
});


// Connect MongoDB and start server
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Backend server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

connectDB();