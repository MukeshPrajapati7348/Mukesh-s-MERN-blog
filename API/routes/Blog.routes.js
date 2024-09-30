import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogs,
} from "../controllers/blog.controller.js";
import { verifyToken } from "../utils/user.verification.js";

const router = express.Router();

router.post("/create", verifyToken, createBlog);
router.get("/getBlogs", getBlogs);
router.delete("/delete/:blogId/:userId", verifyToken, deleteBlog);

export default router;
