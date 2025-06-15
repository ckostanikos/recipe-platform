import pool from "./db.js";
import { getUser } from "./user.model.js";

export async function createUser({
  username,
  pass,
  firstname,
  lastname,
  email,
  profile_pic,
}) {
  const [result] = await pool.query(
    "INSERT INTO user (username, pass, firstname, lastname, email, profile_pic) VALUES (?, ?, ?, ?, ?, ?)",
    [username, pass, firstname, lastname, email, profile_pic]
  );
  const id = result.insertId;
  return getUser(id);
}
