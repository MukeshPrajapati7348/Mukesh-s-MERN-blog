import express from "express";
import { verifyToken } from "../utils/user.verification.js";
import {
  deleteUser,
  getUsers,
  updateUser,
  userSignout,
} from "../controllers/user.controller.js";

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", userSignout);
router.get("/getUsers", verifyToken, getUsers);
router.delete("/delete-users/:userId", verifyToken, deleteUser);

export default router;
