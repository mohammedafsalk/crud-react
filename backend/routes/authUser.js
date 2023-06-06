import express from "express";
import {
  checkLogin,
  userLogin,
  userLogout,
  userReg,
} from "../controllers/authUser.js";
const router = express.Router();

router.post("/register", userReg);
router.post("/login", userLogin);
router.get("/checkAuth", checkLogin);
router.get("/logout", userLogout);

export default router;
