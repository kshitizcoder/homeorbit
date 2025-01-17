import express from "express";
import {
  getSavedPropertyByUser,
  savedProperty,
} from "../controller/savedPropertyController.js";
import { protect } from "../controller/authController.js";
const savedPropertyRouter = express.Router();

savedPropertyRouter.post("/", protect, savedProperty);
savedPropertyRouter.get("/", protect, getSavedPropertyByUser);
export default savedPropertyRouter;
