import express from "express";
import {
  createProperty,
  deleteProperty,
  editProperty,
  getAllProperty,
  getAllPropertyByAdmin,
  getProperty,
  getPropertyByUser,
  resizePropertyImages,
  resizePropertyImagesForEdit,
  updateProperty,
  uploadForEdit,
  uploadPropertyImages,
} from "../controller/propertyController.js";
import { protect } from "../controller/authController.js";

const propertyRouter = express.Router();

propertyRouter.route("/property-by-user").get(protect, getPropertyByUser);
propertyRouter
  .route("/")
  .post(
    protect,
    // restrictTo("seller", "renter"),
    uploadPropertyImages,
    resizePropertyImages,
    createProperty
  )
  .get(getAllProperty);
propertyRouter
  .route("/:id")
  .get(getProperty)
  // .patch(updateProperty)
  .delete(protect, deleteProperty);
// propertyRouter.get("/buy/:id", protect, buyProperty);
// propertyRouter.get("/verify-esewa/:id");
propertyRouter.patch(
  "/:id",
  protect,
  uploadPropertyImages,
  resizePropertyImagesForEdit,
  updateProperty
);
propertyRouter.get("/get-property/admin", protect, getAllPropertyByAdmin);
export default propertyRouter;
