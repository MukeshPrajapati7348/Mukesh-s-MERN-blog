import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      requied: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    blogImage: {
      type: String,
      default:
        "https://www.jumpfly.com/wp-content/uploads/2021/09/20210902-SEO-Blog-Post-about-Writing-an-SEO-Post-Jeff-B..png",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("Blog", blogSchema);

export default userModel;
