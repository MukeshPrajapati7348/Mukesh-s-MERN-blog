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
    return res
      .status(201)
      .json({ message: "User registered successfully.", flag: true });
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
      { id: existingUser._id },
      process.env.JWT_Secrect_Key
    );

    const { password: pass, ...restUserDetails } = existingUser._doc;

    return res
      .status(200)
      .cookie("access-token", token, { httpOnly: true })
      .json({
        message: "User signed in successfully",
        flag: true,
        brandingDetails: restUserDetails,
      });
  } catch (error) {
    next(error);
  }
};

export { signin, signup };
