import express from "express";

import {
  loginUser,
  registerUser,
  checkSession,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/session", checkSession);

export default router;
