import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { BiSolidLike, BiLike } from "react-icons/bi";

function Comment({ comment }) {
  const [user, setUser] = useState({});

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
    <div className="flex gap-2 border-b dark:border-gray-600 mb-2">
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
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {/* <BiSolidLike /> */}
            <BiLike className="cursor-pointer" />
            <span className="ml-1">{comment.noOfLikes}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="cursor-pointer">edit</span>
            <span className="cursor-pointer">delete</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
