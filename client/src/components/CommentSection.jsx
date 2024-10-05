import { Button, Spinner, Textarea } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CommentSection({ blogId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCommentInput = (e) => {
    if (comment.length <= 200) {
      setComment(e.target.value);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/comment/create", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          content: comment,
          blogId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      setComment("");

      if (data.flag) {
        toast.success("Comment added successfully");
      } else {
        toast.error(data.errorMessage);
      }
    } catch (error) {
      setComment("");
      setLoading(false);
      toast.error(error.errorMessage);
    }
  };

  return (
    <div>
      {currentUser ? (
        <div className="flex items-center text-gray-500">
          <p className="mr-2">Comment as: </p>
          <img
            src={currentUser.profilePic}
            alt="user"
            className="w-5 h-5 object-cover rounded-full mr-1"
          />
          <Link to="/dashboard?tab=profile" className="text-sm text-cyan-500">
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex gap-2 text-sm">
          <p className="text-teal-500">Please sign-in to comment.</p>
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          className="my-2 border border-teal-500 rounded-md p-3"
          onSubmit={handleCommentSubmit}
        >
          <Textarea
            rows="3"
            maxLength="200"
            placeholder="Add a comment..."
            value={comment}
            onChange={handleCommentInput}
          />
          <div className="flex justify-between items-center mt-3">
            <p className="text-xs text-gray-500">
              {200 - comment.length} characters left.
            </p>
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              type="submit"
              className="w-24"
            >
              {loading ? <Spinner size="sm" color="pink" /> : "Comment"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CommentSection;
