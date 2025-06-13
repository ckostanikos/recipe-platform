import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  getRecipeComments,
  postRecipeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

// Get all comments for a recipe
router.get("/recipes/:id/comments", getRecipeComments);

// Post a comment to a recipe (protected)
router.post("/recipes/:id/comments", isAuthenticated, postRecipeComment);

export default router;
