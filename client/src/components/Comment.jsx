import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

function Comment({ comment, onLike, onUpdate, onDelete }) {
  const [user, setUser] = useState({});
  const [updateContent, setUpdateContent] = useState("");
  const [openEditBox, setOpenEditBox] = useState(false);
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
        {!openEditBox ? (
          <>
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
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <div className="flex items-center text-gray-500 gap-2">
                    <button
                      className="cursor-pointer  hover:text-blue-500"
                      onClick={() => setOpenEditBox(true)}
                    >
                      Edit
                    </button>
                    <button
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => onDelete(comment._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
            </div>
          </>
        ) : (
          <div className="mt-1">
            <Textarea
              defaultValue={comment.content}
              rows="3"
              maxLength="200"
              onChange={(e) => setUpdateContent(e.target.value)}
            />
            <div className="flex items-center justify-end gap-2 mt-2">
              <Button
                gradientDuoTone="purpleToPink"
                onClick={() => {
                  onUpdate(comment._id, updateContent);
                  setOpenEditBox(false);
                }}
              >
                Update
              </Button>
              <Button
                outline
                gradientDuoTone="purpleToPink"
                onClick={() => setOpenEditBox(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
