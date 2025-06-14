import pool from "./db.js";

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

// Update user (with/without image & with/without pass)
export async function updateUser(
  id,
  { firstname, lastname, pass, profile_pic }
) {
  let fields = ["firstname = ?", "lastname = ?"];
  let params = [firstname, lastname];

  if (profile_pic !== undefined) {
    fields.push("profile_pic = ?");
    params.push(profile_pic);
  }
  if (pass) {
    fields.push("pass = ?");
    params.push(pass);
  }
  params.push(id);
  const sql = `UPDATE user SET ${fields.join(", ")} WHERE id = ?`;
  await pool.query(sql, params);
}

export async function deleteUser(id) {
  await pool.query("DELETE FROM user WHERE id = ?", [id]);
}
