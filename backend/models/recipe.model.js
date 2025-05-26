import pool from "./models/db.js";

export async function getRecipes() {
  const [rows] = await pool.query("SELECT * FROM recipes");
  return rows;
}

export async function getRecipe(id) {
  const [rows] = await pool.query("SELECT * FROM recipes WHERE id = ?", [id]);
  return rows[0];
}

export async function createRecipe(
  title,
  description,
  ingredients,
  instructions,
  image_url
) {
  const [result] = await pool.query(
    "INSERT INTO recipes (title, description, ingredients, instructions, image_url) VALUES (?, ?, ?, ?, ?)",
    [title, description, ingredients, instructions, image_url]
  );
  const id = result.insertId; // Get the ID of the newly created recipe
  return getRecipe(id); // Return the newly created recipe
}

export async function updateRecipe(
  id,
  title,
  description,
  ingredients,
  instructions,
  image_url
) {
  await pool.query(
    "UPDATE recipes SET title = ?, description = ?, ingredients = ?, instructions = ?, image_url = ? WHERE id = ?",
    [title, description, ingredients, instructions, image_url, id]
  );
  return getRecipe(id); // Return the updated recipe
}
export async function deleteRecipe(id) {
  await pool.query("DELETE FROM recipes WHERE id = ?", [id]);
  return { message: "Recipe deleted successfully" }; // Return a success message
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
