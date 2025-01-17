import mongoose from "mongoose";
import fs from "fs";
import saveProperty from "../model/SavedProperty.js";

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://kshitiz:12345@cluster0.ccv28.mongodb.net/", {})
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error("DB connection error:", err));

// READ JSON FILE
const res = JSON.parse(
  fs.readFileSync(new URL("./savedproperties.json", import.meta.url), "utf-8")
);

// Convert `$oid` values to `ObjectId`
const transformedData = res.map((item) => {
  // Convert _id
  if (item._id && item._id.$oid) {
    item._id = new mongoose.Types.ObjectId(item._id.$oid);
  }
  // Convert `user` field if it exists and has `$oid`
  if (item.user && item.user.$oid) {
    item.user = new mongoose.Types.ObjectId(item.user.$oid);
  }
  return item;
});

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await saveProperty.create(transformedData);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.error("Error importing data:", err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await saveProperty.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.error("Error deleting data:", err);
  }
  process.exit();
};

// Process command-line arguments
const args = process.argv[2];
if (args === "--import") {
  importData();
} else if (args === "--delete") {
  deleteData();
}

// import fs from "fs";
// import mongoose from "mongoose";

// import User from "../model/User.js";

// mongoose
//   .connect("mongodb+srv://kshitiz:12345@cluster0.ccv28.mongodb.net/", {
//     // useNewUrlParser: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false,
//   })
//   .then(() => console.log("DB connection successful!"));

// // READ JSON FILE
// const res = JSON.parse(
//   fs.readFileSync(new URL("./users.json", import.meta.url), "utf-8")
// );

// // IMPORT DATA INTO DB
// const importData = async () => {
//   try {
//     await User.create(res);
//     console.log("Data successfully loaded!");
//   } catch (err) {
//     console.error(err);
//   }
//   process.exit();
// };

// // DELETE ALL DATA FROM DB
// const deleteData = async () => {
//   try {
//     await User.deleteMany();
//     console.log("Data successfully deleted!");
//   } catch (err) {
//     console.error(err);
//   }
//   process.exit();
// };

// const args = process.argv[2];
// if (args === "--import") {
//   importData();
// } else if (args === "--delete") {
//   deleteData();
// }
