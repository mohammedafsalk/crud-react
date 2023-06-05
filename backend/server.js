import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import dbConnect from "./config/dbConnect.js";

dbConnect();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve() + "/public"));  

dotenv.config();

app.use("/", userRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT, () => {
  console.log("server running on port 5000");
});
