import pool from "../models/db.js";

export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM user");
  return rows;
}

export async function getUser(id) {
  const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
  return rows[0];
}

export async function getUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [
    email,
  ]);
  return rows[0];
}

export async function getUserByUsername(username) {
  const [rows] = await pool.query("SELECT * FROM user WHERE username = ?", [
    username,
  ]);
  return rows[0];
}

export async function updateUser(id, pass, firstname, lastname, profile_pic) {
  await pool.query(
    "UPDATE user SET  pass = ?, firstname = ?, lastname = ?, profile_pic = ? WHERE id = ?",
    [pass, firstname, lastname, profile_pic, id]
  );
  return getUser(id); // Return the updated user
}
export async function deleteUser(id) {
  await pool.query("DELETE FROM user WHERE id = ?", [id]);
  return { message: "User deleted successfully" }; // Return a success message
}
