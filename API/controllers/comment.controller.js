import { errorHandler } from "../utils/error.handle.js";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, blogId, userId } = req.body;

    if (req.user.id !== userId) {
      return next(errorHandler(403, "You are not authorized to comment"));
    }

    const newComment = new Comment({ content, blogId, userId });
    await newComment.save();

    return res.status(200).json({ flag: true, newComment });
  } catch (error) {
    next(error);
  }
};

export const getBlogComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ flag: true, comments });
  } catch (error) {
    next(error);
  }
};
