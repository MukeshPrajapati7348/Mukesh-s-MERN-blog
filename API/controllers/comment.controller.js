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

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment does not exist"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.likes.push(req.user.id);
      comment.noOfLikes += 1;
    } else {
      comment.likes.splice(userIndex, 1);
      comment.noOfLikes -= 1;
    }

    await comment.save();

    return res.status(200).json({ flag: true, comment });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment does not exist"));
    }

    if (!req.user.isAdmin && req.user.id !== comment.userId) {
      return next(
        errorHandler(403, "You are not authorized to update this comment")
      );
    }

    comment.content = req.body.content;
    await comment.save();

    return res.status(200).json({ flag: true, comment });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment does not exist"));
    }

    if (!req.user.isAdmin && req.user.id !== comment.userId) {
      return next(
        errorHandler(403, "You are not authorized to update this comment")
      );
    }

    await Comment.findByIdAndDelete(req.params.commentId);

    return res.status(200).json({ flag: true });
  } catch (error) {
    next(error);
  }
};
