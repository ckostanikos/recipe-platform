import express from "express";
import multer from "multer";

import {
  getOwnProfile,
  getAllUsers,
  updateProfile,
  deleteProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Get all users (if needed)
router.get("/users", getAllUsers);

// We used profile as a REST APIs convention
router.get("/profile", isAuthenticated, getOwnProfile);
router.put(
  "/profile",
  isAuthenticated,
  upload.single("profile_pic"),
  updateProfile
);
router.delete("/profile", isAuthenticated, deleteProfile);

export default router;
