import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from "../controllers/blog.controller.js";
import { verifyToken } from "../utils/user.verification.js";

const router = express.Router();

router.post("/create", verifyToken, createBlog);
router.get("/getBlogs", getBlogs);
router.delete("/delete/:blogId/:userId", verifyToken, deleteBlog);
router.get("/getBlog/:blogId", getBlog);
router.put("/updateBlog/:blogId/:userId", verifyToken, updateBlog);

export default router;
