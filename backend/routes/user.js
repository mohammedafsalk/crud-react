import express from "express";
import multer from "multer";
import { editProfile } from "../controllers/user.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + ".jpg";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
router.get("/", (req, res) => {
  res.json("data");
});
router.post("/edit-profile", upload.single("files"), editProfile);

export default router;
