import { createUser } from "../models/auth.model.js";
import { getUserByEmail, getUserByUsername } from "../models/user.model.js";
import bcrypt from "bcrypt";

export async function registerUser(req, res) {
  const { username, pass, firstname, lastname, email } = req.body;
  const profile_pic = req.file ? req.file.buffer : null;

  if (!username || !pass || !firstname || !lastname || !email) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }

  try {
    // Check if email or username already exists
    const existingUserByEmail = await getUserByEmail(email);
    const existingUserByUsername = await getUserByUsername(username);
    if (existingUserByEmail) {
      return res
        .status(409)
        .json({ success: false, error: "Email already in use." });
    } else if (existingUserByUsername) {
      return res
        .status(409)
        .json({ success: false, error: "Username already in use." });
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const user = await createUser({
      username,
      pass: hashedPassword,
      firstname,
      lastname,
      email,
      profile_pic,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      id: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Registration failed." });
  }
}

export async function loginUser(req, res) {
  const { email, pass } = req.body;

  // Checks for required fields
  if (!pass || !email) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }

  try {
    // Searches for the user in the database and prints error message if doesn't exist
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return res.status(401).json({ success: false, error: "Invalid email." });
    }
    // Using the bcrypt.compare we can unhash and unsalt the password from the database and see if the actual password is correct
    const isMatch = await bcrypt.compare(pass, existingUser.pass);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid password." });
    }

    // Set session
    req.session.userId = existingUser.id;

    //Login successful
    res.status(200).json({
      success: true,
      message: "Login Successful",
      userId: existingUser.id,
      email: existingUser.email,
      username: existingUser.username,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Server error during login." });
  }
}
export function checkSession(req, res) {
  if (req.session && req.session.userId) {
    return res.json({ loggedIn: true, userId: req.session.userId });
  } else {
    return res.json({ loggedIn: false });
  }
}

export async function logoutUser(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, error: "Logout failed." });
    }
    res.clearCookie("connect.sid"); // Clears the cookie from browser
    res.json({ success: true, message: "Logged out." });
  });
}
