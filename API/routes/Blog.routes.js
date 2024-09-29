import express from "express";
import { createBlog, getBlogs } from "../controllers/blog.controller.js";
import { verifyToken } from "../utils/user.verification.js";

const router = express.Router();

router.post("/create", verifyToken, createBlog);
router.get("/getBlogs", getBlogs);

export default router;
