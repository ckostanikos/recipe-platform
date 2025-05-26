import pool from "../models/db.js";
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
  const id = result.insertId; // Get the ID of the newly created user
  return getUser(id); // Return the newly created user
}
