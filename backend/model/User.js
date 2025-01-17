import validator from "validator";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "Email must be unique "],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    photo: String,
    role: {
      type: String,
      enum: ["buyer", "admin", "seller"],
      default: "buyer",
    },
    password: {
      type: String,
      required: [true, "Please Provide a password"],
      minilength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "password are not same",
      },
    },
    passwordChangedAt: Date,
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userShema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userShema.methods.correctPassword = async function (
  candiatePassword,
  userPassword
) {
  return await bcrypt.compare(candiatePassword, userPassword);
};
userShema.methods.changesPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
export default mongoose.model("User", userShema);
