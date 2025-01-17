import express from "express";
import { protect } from "../controller/authController.js";
import { addMessage } from "../controller/messageController.js";

const messageRouter = express.Router();

messageRouter.post("/:chatId", protect, addMessage);

export default messageRouter;
