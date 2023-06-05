import express from "express";
import {
  getUsers,
  adminAuth,
  adminLogin,
  adminLogout,
  getUser,
  deleteUser,
  updateUser,
  createUser,
} from "../controllers/admin.js";
const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.get("/delete-user/:id", deleteUser);
router.post("/update-user", updateUser);
router.post("/create-user", createUser);
router.get("/logout", adminLogout);
router.get("/adminAuth", adminAuth);

export default router;
