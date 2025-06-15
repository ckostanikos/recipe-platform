import express from "express";
import multer from "multer";
import {
  loginUser,
  registerUser,
  checkSession,
  logoutUser,
} from "../controllers/auth.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/auth/register", upload.single("profile_pic"), registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/session", checkSession);
router.post("/auth/logout", logoutUser);

export default router;
