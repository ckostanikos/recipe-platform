import express from "express";
import { getUserById, getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

// Get all users (if needed)
router.get("/users", getAllUsers);

// Get a single user by id
router.get("/users/:id", getUserById);

export default router;
