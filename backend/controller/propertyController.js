import Property from "../model/Property.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import mongoose from "mongoose";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import sharp from "sharp";
import fs from "fs";
import path from "path";
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadPropertyImages = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "images", maxCount: 6 },
]);

export const resizePropertyImages = catchAsync(async (req, res, next) => {
  if (!req.files || (!req.files.thumbnail && !req.files.images)) {
    return next(
      new AppError("Please upload at least a thumbnail or images.", 400)
    );
  }

  // Process thumbnail if it exists
  if (req.files.thumbnail) {
    req.body.thumbnail = `thumbnail-${req.user.id}-${Date.now()}-cover.jpeg`;
    const thumbnailPath = `public/thumbnail/${req.body.thumbnail}`;

    await sharp(req.files.thumbnail[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(thumbnailPath)
      .catch((err) => next(new AppError("Error processing thumbnail", 500)));
  }

  // Process images if they exist
  req.body.images = [];
  if (req.files.images) {
    await Promise.all(
      req.files.images.map(async (file, i) => {
        const filename = `property-${req.user.id}-${Date.now()}-${i + 1}.jpeg`;
        const filePath = `public/propertyImg/${filename}`;

        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(filePath)
          .catch((err) =>
            next(new AppError(`Error processing image ${i + 1}`, 500))
          );

        req.body.images.push(filename); // Store the full path
      })
    );
  }

  next();
});
// export const resizePropertyImages = catchAsync(async (req, res, next) => {
//   if (!req.files.thumbnail || !req.files.images) return next();

//   req.body.thumbnail = `property-${req.user.id}-${Date.now()}-cover.jpeg`;
//   const thumbnailPath = `public/thumbnail/${req.body.thumbnail}`;

//   await sharp(req.files.thumbnail[0].buffer)
//     .resize(2000, 1333)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`public/thumbnail/${req.body.thumbnail}`);

//   req.body.images = [];

//   await Promise.all(
//     req.files.images.map(async (file, i) => {
//       const filename = `property-${req.user.id}-${Date.now()}-${i + 1}.jpeg`;
//       const filePath = `public/propertyImg/${filename}`;

//       await sharp(file.buffer)
//         .resize(2000, 1333)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`public/propertyImg/${filename}`)
//         .catch((err) =>
//           next(new AppError(`Error processing image ${i + 1}`, 500))
//         );

//       req.body.images.push(filePath); // Store the full path
//     })
//   );

//   next();
// });
export const createProperty = catchAsync(async (req, res, next) => {
  const {
    title,
    NumberOfBathroom,
    NumberOfBedRoom,
    NumberOfLivingRoom,
    description,
    typeOfProperty,
    price,
    propertyArea,
    latitude,
    longitude,
    city,
  } = req.body;

  const newProperty = await Property.create({
    title,
    NumberOfBathroom,
    NumberOfBedRoom,
    NumberOfLivingRoom,
    description,
    typeOfProperty,
    price,
    propertyArea,
    thumbnail: req.body.thumbnail,
    images: req.body.images,
    city,
    latitude,
    longitude,
    user: req.user.id,
  });
  res.status(201).json({
    status: "success",
    property: newProperty,
  });
});

export const getAllProperty = catchAsync(async (req, res, next) => {
  const { city, minprice, maxprice, type, page, limit, sortBy } = req.query;

  let queryObj = {};

  // if (city) {
  //   queryObj.city = city;
  // }
  if (city) {
    // Use a regex for case-insensitive search
    queryObj.city = { $regex: city, $options: "i" };
  }

  if (minprice) {
    queryObj.price = { ...queryObj.price, $gte: Number(minprice) || 1000 };
  }

  if (maxprice) {
    queryObj.price = { ...queryObj.price, $lte: Number(maxprice) | 100000 };
  }

  if (type) {
    queryObj.typeOfProperty = type;
  }
  let query = Property.find(queryObj);

  if (sortBy) {
    query.query.sort(sortBy || "price");
  }
  const pageNumber = page * 1 || 1;
  const limitNumber = limit * 1 || 100;
  const skip = (pageNumber - 1) * limit;

  query = query.skip(skip).limit(limitNumber);
  const property = await query;
  return res.status(200).json({
    status: "success",
    result: property.length,
    property,
  });
});

export const getProperty = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new AppError("No Property Found With That ID", 400));
  }
  return res.status(200).json({
    status: "success",
    property,
  });
});

export const getAllPropertyByAdmin = catchAsync(async (req, res, next) => {
  const property = await Property.find();

  return res.status(200).json({
    status: "success",
    property,
  });
});

// export const updateProperty = catchAsync(async (req, res, next) => {
//   const {
//     title,
//     NumberOfBathroom,
//     NumberOfBedRoom,
//     NumberOfLivingRoom,
//     description,
//     typeOfProperty,
//     price,
//     propertyArea,
//     latitude,
//     longitude,
//     city,
//   } = req.body;
//   const property = await Property.findByIdAndUpdate(req.params.id, { title,
//     NumberOfBathroom,
//     NumberOfBedRoom,
//     NumberOfLivingRoom,
//     description,
//     typeOfProperty,
//     price,
//     propertyArea,
//     thumbnail: req.body.thumbnail,
//     images: req.body.images,
//     city,
//     latitude,
//     longitude,
//     user: req.user.id,}, {
//     new: true,
//     runValidators: true,
//   });
//   if (!property) {
//     return next(new AppError("Property Not Found", 404));
//   }
//   return res.status(200).json({
//     status: "success",
//     property,
//   });
// });
export const resizePropertyImagesForEdit = catchAsync(
  async (req, res, next) => {
    // Skip image processing if no files were uploaded
    if (!req.files || (!req.files.thumbnail && !req.files.images)) {
      return next(); // Proceed to the next middleware (i.e., updateProperty)
    }

    // Process thumbnail if it exists
    if (req.files.thumbnail) {
      req.body.thumbnail = `thumbnail-${req.user.id}-${Date.now()}-cover.jpeg`;
      const thumbnailPath = `public/thumbnail/${req.body.thumbnail}`;

      await sharp(req.files.thumbnail[0].buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(thumbnailPath)
        .catch((err) => next(new AppError("Error processing thumbnail", 500)));
    }

    // Process images if they exist
    req.body.images = [];
    if (req.files.images) {
      await Promise.all(
        req.files.images.map(async (file, i) => {
          const filename = `property-${req.user.id}-${Date.now()}-${
            i + 1
          }.jpeg`;
          const filePath = `public/propertyImg/${filename}`;

          await sharp(file.buffer)
            .resize(2000, 1333)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(filePath)
            .catch((err) =>
              next(new AppError(`Error processing image ${i + 1}`, 500))
            );

          req.body.images.push(filename); // Store the full path
        })
      );
    }

    next();
  }
);

export const updateProperty = catchAsync(async (req, res, next) => {
  const {
    title,
    NumberOfBathroom,
    NumberOfBedRoom,
    NumberOfLivingRoom,
    description,
    typeOfProperty,
    price,
    propertyArea,
    latitude,
    longitude,
    city,
  } = req.body;

  // Get the property by ID
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new AppError("Property Not Found", 404));
  }

  // Only update the fields that are provided in the request body
  if (title) property.title = title;
  if (NumberOfBathroom) property.NumberOfBathroom = NumberOfBathroom;
  if (NumberOfBedRoom) property.NumberOfBedRoom = NumberOfBedRoom;
  if (NumberOfLivingRoom) property.NumberOfLivingRoom = NumberOfLivingRoom;
  if (description) property.description = description;
  if (typeOfProperty) property.typeOfProperty = typeOfProperty;
  if (price) property.price = price;
  if (propertyArea) property.propertyArea = propertyArea;
  if (latitude) property.latitude = latitude;
  if (longitude) property.longitude = longitude;
  if (city) property.city = city;

  // Update images and thumbnail if present
  if (req.body.thumbnail) property.thumbnail = req.body.thumbnail;
  if (req.body.images && req.body.images.length > 0)
    property.images = req.body.images;

  // Save the updated property
  await property.save();

  return res.status(200).json({
    status: "success",
    property,
  });
});

export const deleteProperty = catchAsync(async (req, res, next) => {
  const property = await Property.findByIdAndDelete(req.params.id);
  if (!property) {
    return next(new AppError("Property Not Found", 404));
  }
  return res.status(204).json({
    status: "success",
    data: null,
  });
});

export const getPropertyByUser = catchAsync(async (req, res, next) => {
  const property = await Property.find({ user: req.user.id });

  return res.status(200).json({
    status: "success",
    property,
  });
});

// export const buy = catchAsync(async (req, res) => {
//   const id = req.params.id;

//   const property = await Property.findById(id);
//   const uid = uuidv4();
//   const message = `total_amount=${property.price},transaction_uuid=${uid},product_code=EPAYTEST`;
//   const hash = CryptoJS.HmacSHA256(message, process.env.ESEWASECRET);
//   const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
//   console.log(uid);

//   // res.send(`${id},${book.title},secret:${process.env.ESEWASECRET},hash:${hashInBase64}`)
//   res.render("order", {
//     description: book.description,
//     image: book.image,
//     id: book.id,
//     title: book.title,
//     uid: uid,
//     price: book.price,
//     signature: hashInBase64,
//   });
// });

export const buyProperty = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const property = await Property.findById(id);
  if (!property) {
    return next(new AppError("property not found", 404));
  }

  const uid = uuidv4();
  const message = `total_amount=${5000},transaction_uuid=${uid},product_code=EPAYTEST`;
  const hash = CryptoJS.HmacSHA256(message, process.env.ESEWASECRET);
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

  return res.status(200).json({
    status: "success",
    data: {
      description: property.description,
      thumbnail: property.thumbnail,
      id: property._id,

      uid,
      price: 5000,
      signature: hashInBase64,
    },
  });
});

export const verifyEsewa = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.query;

  // Decode and parse the received data
  let decodedString;
  try {
    decodedString = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
  } catch (error) {
    return next(new AppError("Invalid data format", 400));
  }

  const {
    status,
    transaction_code,
    total_amount,
    transaction_uuid,
    product_code,
    signed_field_names,
    signature,
  } = decodedString;

  switch (status) {
    case "COMPLETE":
      try {
        const user_id = req.session.user?._id; // Ensure user is authenticated
        if (!user_id) {
          return next(new AppError("User not authenticated", 401));
        }

        const property = await Property.findById(id);
        if (!property) {
          return next(new AppError("property not found", 404));
        }

        // Recalculate the hash for verification
        const message = `transaction_code=${transaction_code},status=${status},total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code},signed_field_names=${signed_field_names}`;
        const calculatedHash = CryptoJS.HmacSHA256(
          message,
          process.env.ESEWASECRET
        );
        const calculatedHashBase64 =
          CryptoJS.enc.Base64.stringify(calculatedHash);

        if (calculatedHashBase64 !== signature) {
          return next(new AppError("Signature mismatch", 403));
        }

        // Create a new order
        await Buy.create({
          buyBy: user_id,
          propertyId: book.id,
          price: 5000,
        });

        res.status(200).json({
          status: "success",
          message: "Property Buying  successfully",
        });
      } catch (error) {
        return next(
          new AppError(`Error processing the order: ${error.message}`, 500)
        );
      }
      break;

    case "PENDING":
      return res.status(200).json({
        status: "pending",
        message: "Transaction is pending.",
      });

    case "FULL_REFUND":
      return res.status(200).json({
        status: "refunded",
        message: "Transaction has been fully refunded.",
      });

    case "CANCELED":
      return res.status(200).json({
        status: "canceled",
        message: "Transaction has been canceled.",
      });

    default:
      return next(new AppError("Invalid transaction status", 400));
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "thumbnail") {
      cb(null, path.join(__dirname, "thumbnail"));
    } else if (file.fieldname === "images") {
      cb(null, path.join(__dirname, "propertyimg"));
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

// File filter for valid image types
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

export const uploadForEdit = multer({ storage, fileFilter });
// Resize images using sharp
export const editProperty = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Validate property ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid property ID format", 400));
  }

  const property = await Property.findById(id);

  if (!property) {
    return next(new AppError("Property not found", 404));
  }

  // Handle ownership
  const userId = req.user.id;
  if (property.user.toString() !== userId) {
    return next(
      new AppError("You are not authorized to edit this property", 403)
    );
  }

  // Process files if uploaded
  if (req.files?.thumbnail) {
    const thumbnailPath = `public/thumbnail/${req.files.thumbnail[0].filename}`;
    await sharp(req.files.thumbnail[0].path)
      .resize(500, 500)
      .toFile(thumbnailPath);
    req.body.thumbnail = thumbnailPath;
  }

  if (req.files?.images) {
    req.body.images = [];
    for (const file of req.files.images) {
      const imagePath = `public/propertyImg/${file.filename}`;
      await sharp(file.path).resize(800, 600).toFile(imagePath);
      req.body.images.push(imagePath);
    }
  }

  // Dynamically update only provided fields
  const updatedProperty = await Property.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: { property: updatedProperty },
  });
});
