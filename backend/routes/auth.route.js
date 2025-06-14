import express from "express";

import {
  loginUser,
  registerUser,
  checkSession,
  logoutUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/session", checkSession);
router.post("/auth/logout", logoutUser);

export default router;
