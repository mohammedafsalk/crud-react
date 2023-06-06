import express from "express";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
} from "../controllers/admin.js";
const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.get("/delete-user/:id", deleteUser);
router.post("/update-user", updateUser);
router.post("/create-user", createUser);

export default router;
