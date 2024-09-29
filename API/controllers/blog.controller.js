import { errorHandler } from "../utils/error.handle.js";
import Blog from "../models/Blog.model.js";

const createBlog = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create this post"));
  }

  const { title, content } = req.body;

  if (!title || !title.trim() || !content || !content.trim()) {
    return next(errorHandler(400, "Please fill all the fields"));
  }

  req.body.title = req.body.title.trim();
  req.body.content = req.body.content.trim();

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newBlog = new Blog({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const createdBlog = await newBlog.save();

    res.status(201).json({ flag: true, blog: createdBlog });
  } catch (error) {
    next(error);
  }
};

const getBlogs = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const blogLimit = parseInt(req.query.limit) || 9;
    const sortBy = req.query.sortBy === "asc" ? 1 : -1;
    const blogs = await Blog.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.blogId && { _id: req.query.blogId }),
      ...(req.query.searchVal && {
        $or: [
          { title: { $regex: req.query.searchVal, $options: "i" } },
          { content: { $regex: req.query.searchVal, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortBy })
      .skip(startIndex)
      .limit(blogLimit);

    const totalBlogCount = await Blog.countDocuments();
    const now = new Date();
    const lastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthBlogCount = await Blog.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    return res.status(200).json({ blogs, totalBlogCount, lastMonthBlogCount });
  } catch (error) {
    next(error);
  }
};

export { createBlog, getBlogs };
