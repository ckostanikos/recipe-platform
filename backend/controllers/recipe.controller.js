import multer from "multer";
import {
  createRecipeInDb,
  addIngredientsToRecipe,
  getRecipes,
  getRecipe,
} from "../models/recipe.model.js";

// Setup multer to handle file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Export upload middleware for routes
export const uploadRecipeImage = upload.single("image");

// Create recipe controller
export async function createRecipe(req, res) {
  try {
    const { title, instructions, production_time } = req.body;
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized." });
    }

    if (!title || !instructions || !production_time) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }

    // Parse ingredients from JSON string
    let ingredients = [];
    if (req.body.ingredients) {
      try {
        ingredients = JSON.parse(req.body.ingredients);
      } catch (err) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid ingredients format." });
      }
    }

    // Get image buffer (optional)
    let imageBuffer = null;
    if (req.file) {
      imageBuffer = req.file.buffer;
    }

    // Save the recipe in the DB
    const recipeId = await createRecipeInDb({
      title,
      instructions,
      production_time,
      user_id: userId,
      image: imageBuffer,
    });

    // Save ingredients
    if (ingredients.length > 0) {
      await addIngredientsToRecipe(recipeId, ingredients);
    }

    res.status(201).json({
      success: true,
      message: "Recipe created successfully.",
      id: recipeId,
    });
  } catch (err) {
    console.error("Error creating recipe:", err);
    res.status(500).json({ success: false, error: "Failed to create recipe." });
  }
}

// Get all recipes
export async function getAllRecipes(req, res) {
  try {
    const recipes = await getRecipes();
    res.status(200).json({ success: true, recipes });
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ success: false, error: "Failed to fetch recipes." });
  }
}

// Get a single recipe by ID
export async function getSingleRecipe(req, res) {
  try {
    const { id } = req.params;
    const recipe = await getRecipe(id);

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, error: "Recipe not found." });
    }

    res.status(200).json({ success: true, recipe });
  } catch (err) {
    console.error("Error fetching recipe:", err);
    res.status(500).json({ success: false, error: "Failed to fetch recipe." });
  }
}
