import pool from "./db.js";

export async function getCommentsByRecipe(recipeId) {
  const [rows] = await pool.query(
    `SELECT c.comment, c.created, u.username
     FROM comments c
     JOIN user u ON c.user_id = u.id
     WHERE c.recipe_id = ?
     ORDER BY c.created ASC`,
    [recipeId]
  );
  return rows;
}

export async function addCommentToRecipe(recipeId, userId, commentText) {
  const [result] = await pool.query(
    `INSERT INTO comments (comment, recipe_id, user_id)
     VALUES (?, ?, ?)`,
    [commentText, recipeId, userId]
  );
  return result.insertId;
}
