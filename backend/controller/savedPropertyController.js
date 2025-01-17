import Property from "../model/Property.js";
import SavedProperty from "../model/SavedProperty.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const savedProperty = catchAsync(async (req, res, next) => {
  const { propertyId } = req.body;

  // Check if the property is already saved
  const existingProperty = await SavedProperty.findOne({
    userId: req.user.id,
    propertyId,
  });
  if (existingProperty) {
    return next(new AppError("Property already saved", 400));
  }

  // Save the property
  const savedProperty = await SavedProperty.create({
    userId: req.user.id,
    propertyId,
  });

  res.status(201).json({
    status: "success",
    data: savedProperty,
  });
});
export const getSavedPropertyByUser = catchAsync(async (req, res, next) => {
  const savedProperties = await SavedProperty.find({
    userId: req.user.id,
  }).populate("propertyId");
  if (!savedProperties) {
    return next(new AppError("No Property found"), 404);
  }
  const properties = savedProperties.map(
    (savedProperty) => savedProperty.propertyId || null // Handle unresolved references
  );

  // Debug output

  res.status(200).json({
    status: "success",
    properties,
  });
});
