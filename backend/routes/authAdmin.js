import express, { Router } from "express";
import { adminAuth, adminLogin, adminLogout } from "../controllers/authAdmin.js";
const router = express.Router();


router.post("/login", adminLogin);
router.get("/logout", adminLogout);
router.get("/adminAuth", adminAuth);

export default router;
