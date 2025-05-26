import express from "express";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/api", userRoutes);
app.use("/api", authRoutes); // for /api/login, /api/register, /api/logout

export default app;

app.get("/api/users", async (req, res) => {
  const users = await getUsers();
  res.status(201).send(users);
});

app.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.status(201).send(user);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(4005, () => {
  console.log("Server is running on port 4005");
});

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});
