import express from "express";
import {
  signUp,
  login,
  protect,
  logout,
} from "../controller/authController.js";
import {
  getAllUser,
  getStatOfUsers,
  getUser,
  // resizeUserPhoto,
  // updateMe,
  updateUserProfile,
  uploadPhoto,
  // uploadUserPhoto,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/me", protect, getUser);
userRouter.get("/all-users", protect, getAllUser);
userRouter.patch("/updateme/:id", protect, uploadPhoto, updateUserProfile);
userRouter.get("/getuser/stats", protect, getStatOfUsers);

// userRouter.get("/profile", profile);

export default userRouter;
