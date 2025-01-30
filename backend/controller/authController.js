import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import Property from "../model/Property.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECREATE_KEY, {
    expiresIn: "90d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
    cookieOptions.sameSite = "Strict";
  }

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
    // passwordChangedAt: "2022-03-04",
  });

  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1.check if email and password exist
  if (!email || !password) {
    return next(new AppError("please provide email and password", 400));
  }
  // 2. check if user exists && password is correct

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }
  // 3 if everything ok send token to client

  createSendToken(user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
  let token;

  // 1. Get token from headers or cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // 2. Check if token exists
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 3. Verify token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECREATE_KEY // Ensure this matches your .env variable
  );

  // 4. Check if user exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401)
    );
  }

  // 5. Check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // 6. Grant access
  req.user = currentUser;
  next();
});

export const logout = catchAsync(async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
});
// export const protect = catchAsync(async (req, res, next) => {
//   // 1 getting token and check of its there
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//     // console.log("token 😁", token);
//     if (!token) {
//       return next(
//         new AppError(
//           "You are not logged  in! please log in to get access ",
//           401
//         )
//       );
//     }
//   }
//   // 2 verification token
//   const decoded = await promisify(jwt.verify)(
//     token,
//     process.env.JWT_SECREATE_KEY
//   );

//   // 3 check if user still exits
//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError("The user beloging to this token does no longer exsits", 401)
//     );
//   }
//   // 4 check if user change password after jwt issued
//   if (currentUser.changesPasswordAfter(decoded.iat)) {
//     return next(new AppError("Please login again", 401));
//   }
//   req.user = currentUser;

//   next();
// });

// export const protect = catchAsync(async (req, res, next) => {
//   let token;

//   // 1. Getting token and checking if it's there
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];

//     if (!token) {
//       return next(
//         new AppError("You are not logged in! Please log in to get access", 401)
//       );
//     }
//   }

//   // 2. Verify the token
//   const decoded = await promisify(jwt.verify)(
//     token,
//     process.env.JWT_SECREATE_KEY
//   );

//   // 3. Check if user still exists
//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError("The user belonging to this token no longer exists", 401)
//     );
//   }

//   // 4. Check if user changed password after JWT was issued
//   if (currentUser.changesPasswordAfter(decoded.iat)) {
//     return next(new AppError("Please log in again", 401));
//   }

//   req.user = currentUser;
//   next();
// });

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You dont have to perform this action", 403));
    }
    next();
  };
};
export const restrictToSeller = () => {
  return async (req, res, next) => {
    const property = await Property.find({ user: req.params.id });
    const user = property.find((pro) => {
      return pro.user === req.user.id;
    });

    // console.log(product);
    if (req.user.role === "seller") {
      if (property.user.includes(req.user.id)) {
        return next();
      }
    }
  };
};
