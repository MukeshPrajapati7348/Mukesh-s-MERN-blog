import express from "express";
import { verifyToken } from "../utils/user.verification.js";
import {
  createComment,
  deleteComment,
  getBlogComments,
  likeComment,
  updateComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getBlogComments/:blogId", getBlogComments);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/update/:commentId", verifyToken, updateComment);
router.delete("/delete/:commentId", verifyToken, deleteComment);

export default router;
