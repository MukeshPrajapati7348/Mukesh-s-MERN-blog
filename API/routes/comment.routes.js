import express from "express";
import { verifyToken } from "../utils/user.verification.js";
import {
  createComment,
  getBlogComments,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getBlogComments/:blogId", getBlogComments);
router.put("/likeComment/:commentId", verifyToken, likeComment);

export default router;
