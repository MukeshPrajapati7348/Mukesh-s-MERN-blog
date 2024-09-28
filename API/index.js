import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

//Dotenv configuration for later use
dotenv.config();
const port = process.env.PORT || 3000;

//Creating app
const app = express();

//To parse the request body
app.use(express.json());
// app.use(cors());
app.use(cookieParser());

//MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to mongodb successfully!");
  })
  .catch((error) => console.log(error));

//Router to handle all the requests
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//midleware to hance errors
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error.";
  const flag = false;
  res.status(statusCode).json({ errorMessage, flag });
});

app.listen(port, () => console.log(`App is running at port: ${port}`));
