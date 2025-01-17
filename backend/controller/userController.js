import User from "../model/User.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new AppError("Not an image! Please upload only images.", 400), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// export const uploadUserPhoto = upload.single("photo");

// export const resizeUserPhoto = catchAsync(async (req, res, next) => {
//   if (!req.file) return next();

//   req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
//   const outputPath = `public/users/${req.file.filename}`;
//   await sharp(req.file.buffer)
//     .resize(150, 150)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(outputPath);

//   next();
// });

export const getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    status: "success",
    result: user.length,
    user,
  });
});

export const getStatOfUsers = catchAsync(async (req, res, next) => {
  const buyer = await User.find({ role: "buyer" });
  const seller = await User.find({ role: "seller" });
  const admin = await User.find({ role: "admin" });
  res.status(200).json({
    status: "success",
    userData: {
      buyers: buyer.length,
      sellers: seller.length,
      admins: admin.length,
    },
  });
});

// export const getMe = catchAsync(async (req, res, next) => {
//   req.params.id = req.user.id;
//   next();
// });

// export const getUser = catchAsync(async (req, res, next) => {
//    const userId = req.user ? req.user.id : req.params.id;
//    if(!userId)
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     return next(new AppError("user not found", 404));
//   }
//   res.status(200).json({
//     status: "success",
//     user,
//   });
// });
export const getUser = catchAsync(async (req, res, next) => {
  let user;

  if (req.user.id) {
    user = await User.findById(req.user.id);
  }
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    user,
  });
});

// export const updateUser = catchAsync(async (req, res, next) => {
//   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!user) {
//     return next(new AppError("User Not Found", 404));
//   }
//   res.status(200).json({
//     status: "success",
//     user,
//   });
// });
// const filterObj = (obj, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach((el) => {
//     if (allowedFields.includes(el)) newObj[el] = obj[el];
//   });
//   return newObj;
// };

// export const updateMe = catchAsync(async (req, res, next) => {
//   if (req.body.password || req.body.passwordConfirm) {
//     return next(new AppError("This route is not for password updates.", 400));
//   }

//   const filteredBody = filterObj(req.body.name, "name");
//   if (req.file) filteredBody.photo = req.file.filename;
//   // console.log("🎁🎁🎁", filteredBody, "🎁🎁🎁==", req.body);

//   if (!Object.keys(filteredBody).length) {
//     return next(new AppError("No fields provided to update.", 400));
//   }
//   const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
//     new: true,
//     runValidators: true,
//   });

//   return res.status(200).json({
//     status: "success",

//     user: updatedUser,
//   });
// });
// export const profile = (req, res) => {
//   const token = req.cookies?.jwt;
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECREATE_KEY, {}, (err, userData) => {
//       if (err) throw err;
//       res.json(userData);
//     });
//   } else {
//     res.status(401).json("no token");
//   }
// };
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "public/users"; // Directory where photos will be stored
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get file extension
    const filename = `${Date.now()}${ext}`; // Use a timestamp for a unique file name
    cb(null, filename);
  },
});

// Filter for allowed file types (only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."),
      false
    );
  }
};

// Multer middleware
const upload = multer({
  storage,
  fileFilter,
}).single("photo"); // 'photo' is the field name for the image

// Controller function to update user name and photo
export const updateUserProfile = async (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  try {
    const { name } = req.body;
    const userId = req.params.id; // Assuming you're using authentication middleware to add user ID

    // Initialize photo URL
    let photoUrl = req.user.photo; // Keep the old photo if new one is not uploaded

    // If a new photo is uploaded, update the photo URL
    if (req.file) {
      photoUrl = `${req.file.filename}`; // Save the photo URL relative to the public directory
    }

    // Update user in the database
    const user = await User.findByIdAndUpdate(
      userId,
      { name, photo: photoUrl },
      { new: true, runValidators: true } // Return the updated user and run validators
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Something went wrong while updating the profile.",
    });
  }
};

// Multer upload handler (to be used in the route)
export const uploadPhoto = upload;
