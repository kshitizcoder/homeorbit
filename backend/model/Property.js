import mongoose from "mongoose";

const Schema = mongoose.Schema;

const propertySchema = new Schema({
  title: {
    type: String,
    unique: [true, "Please Provide Unique Title"],
    required: [true, "Title Is Required"],
  },
  NumberOfBathroom: {
    type: Number,
    required: [true, "Please Enter No Of Bathroom"],
  },
  NumberOfBedRoom: {
    type: Number,
    required: [true, "Please Enter No Of BedRoom"],
  },
  NumberOfLivingRoom: {
    type: Number,
    required: [true, "Please Enter No Of LivingRoom"],
  },
  description: {
    type: String,
    required: [true, "Description Is Required"],
  },
  typeOfProperty: {
    type: String,
    // enum: ["rent", "sell"],
    required: [true, "Type Of Property Is Required"],
  },
  city: {
    type: String,
    required: [true, "City is Required"],
  },
  price: {
    type: Number,
    required: [true, "Price Is Required"],
  },
  propertyArea: {
    type: Number,
    required: [true, "Property Area Is Required"],
  },
  thumbnail: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  rating: {
    type: Number,
  },

  latitude: {
    type: String,
    // required: true,
  },
  longitude: {
    type: String,
    // required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User Is required"],
    ref: "User",
  },
});
export default mongoose.model("Property", propertySchema);
