import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

function Comment({ comment, onLike }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let data = await fetch(`/api/user/${comment.userId}`);
        data = await data.json();
        if (data.flag) {
          setUser(data.user);
        } else {
          toast.error(data.errorMessage);
        }
      } catch (error) {
        toast.error(error.errorMessage);
      }
    };
    fetchUser();
  }, [comment]);

  return (
    <div className="flex gap-2  mb-5">
      <img
        src={user.profilePic}
        alt="user"
        className="w-8 h-8 object-cover rounded-full flex-shrink-0"
      />
      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <p className="font-bold text-sm truncate">
            @{user ? user.username : "annonymous user"}
          </p>
          <span className="text-xs text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 mb-2">{comment.content}</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <button
              className={`cursor-pointer text-gray-500 hover:text-blue-500 text-sm ${
                comment.likes.includes(currentUser && currentUser._id) &&
                "!text-blue-500"
              }`}
              onClick={() => onLike(comment._id)}
            >
              <FaThumbsUp />
            </button>

            {comment.noOfLikes > 0 && (
              <span className="ml-1 text-xs">
                {comment.noOfLikes > 1
                  ? comment.noOfLikes + " likes"
                  : comment.noOfLikes + " like"}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button className="cursor-pointer">edit</button>
            <button className="cursor-pointer">delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
