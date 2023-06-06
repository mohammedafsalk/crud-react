import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import authUserRouter from "./routes/authUser.js";
import authAdminRouter from "./routes/authAdmin.js";
import dbConnect from "./config/dbConnect.js";
import CheckAuthAdmin from "./middleware/adminAuth.js";
import CheckAuthUser from "./middleware/userAuth.js";

dbConnect();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve() + "/public"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

dotenv.config();

app.use("/", authUserRouter);
app.use("/", CheckAuthUser, userRouter);
app.use("/admin", authAdminRouter);
app.use("/admin", CheckAuthAdmin, adminRouter);

app.listen(process.env.PORT, () => {
  console.log("server running on port 5000");
});
