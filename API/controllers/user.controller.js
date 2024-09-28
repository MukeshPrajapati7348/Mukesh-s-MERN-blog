import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.handle.js";
import bcryptjs from "bcryptjs";

const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.userId) {
    return next(
      errorHandler(401, "You are not authorized to update this user")
    );
  }

  const { username, email, password, profilePic } = req.body;

  if (password) {
    if (password.trim().length < 6) {
      return next(
        errorHandler(400, "Password must be greater than 6 characters")
      );
    }

    if (password.includes(" ")) {
      return next(errorHandler(400, "Password cannot contain empty space"));
    }

    req.body.password = bcryptjs.hashSync(password, 10);
  }

  if (username) {
    if (username.length < 7 || username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }

    if (username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain empty space"));
    }

    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username must be only alphabets and digits")
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username,
          password: req.body.password,
          email,
          profilePic,
        },
      },
      { new: true }
    );

    const { password: pass, ...rest } = updatedUser._doc;

    return res.status(200).json({ flag: true, userDetails: rest });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id != req.params.userId) {
    return next(
      errorHandler(401, "You are not authorized to delete this account")
    );
  }

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);

    if (deletedUser) {
      return res.status(200).cookie("access_token", "").json({
        flag: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

export { updateUser, deleteUser };
