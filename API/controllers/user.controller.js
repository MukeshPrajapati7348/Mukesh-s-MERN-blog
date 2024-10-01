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
    await User.findByIdAndDelete(req.params.userId);

    return res.status(200).json({
      flag: true,
    });
  } catch (error) {
    next(error);
  }
};

const userSignout = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({ flag: true });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(401, "You are not authorized to see all users"));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const userLimit = parseInt(req.query.limit) || 9;
    const sortBy = req.query.sortBy === "asc" ? 1 : -1;
    const users = await User.find()
      .sort({ createdAt: sortBy })
      .skip(startIndex)
      .limit(userLimit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totatUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res.status(200).json({
      flag: true,
      users: usersWithoutPassword,
      lastMonthUsers,
      totatUsers,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOtherUser = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not authorized to delete this user")
    );
  }

  try {
    await User.findByIdAndDelete(req.params.userToDeleteId);
    return res.status(200).json({ flag: true });
  } catch (error) {
    next(error);
  }
};

export { updateUser, deleteUser, userSignout, getUsers, deleteOtherUser };
