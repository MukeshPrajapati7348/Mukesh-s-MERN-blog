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

export { createBlog };
