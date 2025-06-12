import { getUser } from "../models/user.model.js";

export async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await getUser(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
