import mongoose from "mongoose";

const savedPropertySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Property",
    },
  },
  { timestamps: true }
);

// Compound index to prevent duplicates
// savedPropertySchema.index({ userId: 1, propertyId: 1 }, { unique: true });

export default mongoose.model("SavedProperty", savedPropertySchema);
