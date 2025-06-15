import multer from "multer";
import {
  createRecipeInDb,
  addIngredientsToRecipe,
  getRecipes,
  getRecipesByUserWithDetails,
  getRecipeWithIngredients,
} from "../models/recipe.model.js";

// multer handles file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Exports upload middleware for routes
export const uploadRecipeImage = upload.single("image");

// Creates recipe controller
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

    // Parses ingredients from JSON string
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

    // image buffer
    let imageBuffer = null;
    if (req.file) {
      imageBuffer = req.file.buffer;
    }

    // Saves recipe in the DB
    const recipeId = await createRecipeInDb({
      title,
      instructions,
      production_time,
      user_id: userId,
      image: imageBuffer,
    });

    // Saves ingredients
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

// Gets all recipes
export async function getAllRecipes(req, res) {
  try {
    const recipes = await getRecipes();
    res.status(200).json({ success: true, recipes });
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ success: false, error: "Failed to fetch recipes." });
  }
}

// Gets a single recipe by ID that included the ingredients
export async function getSingleRecipe(req, res) {
  try {
    const { id } = req.params;
    const recipe = await getRecipeWithIngredients(id);

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

// Gets recipes for logged-in user
export async function getMyRecipes(req, res) {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized." });
  }
  try {
    const recipes = await getRecipesByUserWithDetails(userId);
    res.status(200).json({ success: true, recipes });
  } catch (err) {
    console.error("Error fetching user recipes:", err);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch user recipes." });
  }
}
