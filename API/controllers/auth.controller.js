import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.handle.js";
import jwt from "jsonwebtoken";

const salt = 10;

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required."));
  }

  const hashedPassword = bcryptjs.hashSync(password, salt);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    return res.status(201).json({ flag: true });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "All fields are required."));
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return next(errorHandler(404, "Please sign up first."));
    }

    const isPassOk = bcryptjs.compareSync(password, existingUser.password);

    if (!isPassOk) {
      return next(errorHandler(400, "Incorrect email or password."));
    }

    const token = jwt.sign(
      { id: existingUser._id, isAdmin: existingUser.isAdmin },
      process.env.JWT_Secrect_Key
    );

    const { password: pass, ...restUserDetails } = existingUser._doc;

    return res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({
        flag: true,
        brandingDetails: restUserDetails,
      });
  } catch (error) {
    next(error);
  }
};

const googleAuth = async (req, res, next) => {
  const { username, email, photoURL } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const token = jwt.sign(
        { id: existingUser._id, isAdmin: existingUser.isAdmin },
        process.env.JWT_Secrect_Key
      );

      const { password: pass, ...restUserDetails } = existingUser._doc;

      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({
          flag: true,
          brandingDetails: restUserDetails,
        });
    } else {
      const randomPass =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const userNewName =
        username.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-5);
      const hashedPassword = bcryptjs.hashSync(randomPass, salt);

      const newUser = new User({
        username: userNewName,
        email,
        password: hashedPassword,
        profilePic: photoURL,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_Secrect_Key
      );
      const { password, ...restUserDetails } = newUser._doc;

      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({
          flag: true,
          brandingDetails: restUserDetails,
        });
    }
  } catch (error) {
    next(error);
  }
};

export { signin, signup, googleAuth };
