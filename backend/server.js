import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log("server running on port 5000");
});
