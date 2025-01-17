import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import AppError from "./utils/appError.js";
import GlobalErrorHandler from "./controller/errorController.js";
import userRouter from "./routes/userRoutes.js";
import propertyRouter from "./routes/propertyRoutes.js";
import savedPropertyRouter from "./routes/savedPropertyRoutes.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());
app.use(express.json());
app.use(express.static("public"));

const DbConnection = process.env.DB_Conection_String;
mongoose
  .connect(DbConnection)
  .then(() => console.log("Db Connection Successful"))
  .catch((err) => console.log(err));

//PORT
const PORT = process.env.PORT || 5000;
//routes

app.use("/api/v1/users", userRouter);
app.use("/api/v1/property", propertyRouter);
app.use("/api/v1/saved-property", savedPropertyRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server `, 404));
});
app.use(GlobalErrorHandler);
app.listen(PORT, () => {
  console.log(`Server Is Running AT ${PORT}`);
});
