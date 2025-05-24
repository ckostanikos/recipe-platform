import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise(); // Use promise-based pool for async/await support

export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM user");
  return rows;
}

export async function getUser(id) {
  const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
  return rows[0];
}

export async function createUser(
  username,
  pass,
  firstname,
  lastname,
  email,
  profile_pic
) {
  const [result] = await pool.query(
    "INSERT INTO user (username, pass, firstname, lastname, email, profile_pic) VALUES (?, ?, ?, ?, ?, ?)",
    [username, pass, firstname, lastname, email, profile_pic]
  );
  const id = result.insertId; // Get the ID of the newly created user
  return getUser(id); // Return the newly created user
}

/* const users = await getUsers();
 console.log(users);

const user = await getUser(1);
console.log(user);

const result = await createUser(
  "newuser1",
  "newpass1",
  "Newfirst1",
  "Newlast1",
  "newemail2@newemail.com",
  "newpic1.jpg"
);
console.log(result);
*/
