import mongoose from "mongoose";
const { Schema } = mongoose;

const buySchema = new Schema({
  buyBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: "Property",
  },

  price: {
    type: Number,
  },
});

const buyProperty = mongoose.model("Buy", buySchema);

export default buyProperty;
