import express, { Router } from "express";
import { protect } from "../controller/authController.js";
import {
  addChat,
  createChat,
  getChat,
  getChats,
} from "../controller/chatController.js";

const chatRouter = express.Router();
chatRouter.get("/", protect, getChats);
chatRouter.get("/:id", protect, getChat);
chatRouter.post("/", protect, addChat);
chatRouter.post("/create", createChat);
export default chatRouter;

// chatRouter.put("/read/:id",protect,readChat)