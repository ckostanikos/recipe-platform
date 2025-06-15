import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  uploadRecipeImage,
  createRecipe,
  getAllRecipes,
  getSingleRecipe,
  getMyRecipes,
} from "../controllers/recipe.controller.js";

const router = express.Router();

// Public route: get all recipes
router.get("/recipes", getAllRecipes);

// Public route: get a single recipe
router.get("/recipes/:id", getSingleRecipe);

// Protected route: create a new recipe
router.post("/recipes", isAuthenticated, uploadRecipeImage, createRecipe);

router.get("/my-recipes", isAuthenticated, getMyRecipes);

export default router;
