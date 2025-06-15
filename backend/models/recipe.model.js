import pool from "./db.js";
export async function getRecipes() {
  const [rows] = await pool.query(`
    SELECT r.*, u.username AS chef,
      (SELECT COUNT(*) FROM ingredients i WHERE i.recipe_id = r.id) AS ingredientCount
    FROM recipes r
    JOIN user u ON r.user_id = u.id
    ORDER BY r.created DESC
  `);

  // Convertion of image buffer to base 64
  for (const row of rows) {
    if (row.image) {
      row.image = `data:image/jpeg;base64,${row.image.toString("base64")}`;
    } else {
      row.image = "images/default.jpg"; // default image if recipe doesn't have one
    }
  }

  return rows;
}

export async function getRecipe(id) {
  const [rows] = await pool.query("SELECT * FROM recipes WHERE id = ?", [id]);
  return rows[0];
}

export async function createRecipeInDb({
  title,
  instructions,
  production_time,
  user_id,
  image,
}) {
  const [result] = await pool.query(
    `INSERT INTO recipes (title, instructions, production_time, user_id, image)
     VALUES (?, ?, ?, ?, ?)`,
    [title, instructions, production_time, user_id, image]
  );
  return result.insertId;
}

export async function addIngredientsToRecipe(recipeId, ingredients) {
  for (const ing of ingredients) {
    await pool.query(
      `INSERT INTO ingredients (ing_name, quantity, recipe_id)
       VALUES (?, ?, ?)`,
      [ing.ing_name, ing.quantity, recipeId]
    );
  }
}

export async function updateRecipe(
  id,
  { title, instructions, production_time, image }
) {
  await pool.query(
    `UPDATE recipes
     SET title = ?, instructions = ?, production_time = ?, image = ?
     WHERE id = ?`,
    [title, instructions, production_time, image, id]
  );
  return getRecipe(id);
}

export async function deleteRecipe(id) {
  await pool.query("DELETE FROM recipes WHERE id = ?", [id]);
  return { message: "Recipe deleted successfully" };
}

export async function getRecipesByUser(userId) {
  const [rows] = await pool.query("SELECT * FROM recipes WHERE user_id = ?", [
    userId,
  ]);
  return rows;
}

export async function getRecipeByName(name) {
  const [rows] = await pool.query("SELECT * FROM recipes WHERE title LIKE ?", [
    `%${name}%`,
  ]);
  return rows;
}

// This is exactly for getting a users recipes
export async function getRecipesByUserWithDetails(userId) {
  const [rows] = await pool.query(
    `
    SELECT r.*, u.username AS chef,
      (SELECT COUNT(*) FROM ingredients i WHERE i.recipe_id = r.id) AS ingredientCount
    FROM recipes r
    JOIN user u ON r.user_id = u.id
    WHERE r.user_id = ?
    ORDER BY r.created DESC
  `,
    [userId]
  );

  // Convert buffer image to base64
  for (const row of rows) {
    if (row.image) {
      row.image = `data:image/jpeg;base64,${row.image.toString("base64")}`;
    } else {
      row.image = "images/default.jpg";
    }
  }

  return rows;
}

export async function getRecipeWithIngredients(id) {
  // Fetch the recipe (including chef username)
  const [recipes] = await pool.query(
    "SELECT r.*, u.username AS chef FROM recipes r JOIN user u ON r.user_id = u.id WHERE r.id = ?",
    [id]
  );
  const recipe = recipes[0];
  if (!recipe) return null;

  // Fetch the ingredients
  const [ingredients] = await pool.query(
    "SELECT ing_name, quantity FROM ingredients WHERE recipe_id = ?",
    [id]
  );

  // Convert image buffer to base64 if present
  if (recipe.image) {
    recipe.image = `data:image/jpeg;base64,${recipe.image.toString("base64")}`;
  } else {
    recipe.image = "images/default.jpg";
  }

  recipe.ingredients = ingredients; // Attach ingredients to the recipe

  return recipe;
}
