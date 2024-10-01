import express from "express";
import { verifyToken } from "../utils/user.verification.js";
import {
  deleteOtherUser,
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
router.delete("/delete/:userToDeleteId/:userId", verifyToken, deleteOtherUser);

export default router;
