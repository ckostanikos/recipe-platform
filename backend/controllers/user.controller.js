import { getUser, updateUser, deleteUser } from "../models/user.model.js";
import bcrypt from "bcrypt";

// Fetch own profile
export async function getOwnProfile(req, res) {
  const userId = req.session.userId;
  const user = await getUser(userId);
  if (!user)
    return res.status(404).json({ success: false, error: "User not found" });

  // We convert profile_pic buffer to base64 data URL if it exists
  if (user.profile_pic) {
    user.profile_pic = `data:image/jpeg;base64,${user.profile_pic.toString(
      "base64"
    )}`;
  } else {
    user.profile_pic = null;
  }

  res.json({ success: true, user });
}

export async function updateProfile(req, res) {
  console.log("req.file:", req.file);
  const userId = req.session.userId;
  const { firstname, lastname, pass } = req.body;
  let updateData = { firstname, lastname };

  // Only add pass if present
  if (pass) {
    updateData.pass = await bcrypt.hash(pass, 10);
  }

  // Only add profile_pic if a new file is uploaded
  if (req.file && req.file.buffer) {
    updateData.profile_pic = req.file.buffer;
  }

  await updateUser(userId, updateData);
  res.json({ success: true, message: "Profile updated" });
}

// Delete profile
export async function deleteProfile(req, res) {
  const userId = req.session.userId;
  await deleteUser(userId);
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Profile deleted" });
  });
}

// Fetxh all users
export async function getAllUsers(req, res) {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getPublicProfile(req, res) {
  const id = req.query.id;
  if (!id) return res.json({ success: false, error: "User id required" });

  const user = await getUser(id);
  if (!user) return res.json({ success: false, error: "User not found" });

  // Return public fields only (omit pass, email if you want)
  if (user.profile_pic)
    user.profile_pic = `data:image/jpeg;base64,${user.profile_pic.toString(
      "base64"
    )}`;
  else user.profile_pic = null;

  // Get user's recipes (with image as base64)
  const recipes = await getRecipesByUserWithDetails(user.id);

  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      profile_pic: user.profile_pic,
    },
    recipes,
  });
}
