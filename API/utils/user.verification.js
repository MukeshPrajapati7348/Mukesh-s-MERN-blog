import jwt from "jsonwebtoken";
import { errorHandler } from "./error.handle.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_Secrect_Key, (error, user) => {
    if (error) {
      return next(errorHandler(401, "You are not authorized"));
    }

    req.user = user;
    next();
  });
};
