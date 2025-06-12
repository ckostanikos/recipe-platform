import pool from "./db.js";

export async function getComments(user_id) {
  const [rows] = await pool.query("SELECT * FROM comments WHERE user_id = ?", [
    user_id,
  ]);
  return rows[0];
}

export async function getComments(recipe_id) {
  const [rows] = await pool.query(
    "SELECT * FROM comments WHERE recipe_id = ?",
    [recipe_id]
  );
  return rows[0];
}

export async function deleteComment(id) {
  await pool.query("DELETE * FROM comments WHERE id = ?", [id]);
  return { message: "Comment deleted successfully" };
}
