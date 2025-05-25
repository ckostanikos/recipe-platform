import express from "express";

import { getUsers, getUser, createUser } from "./db.js";

const app = express();

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(4005, () => {
  console.log("Server is running on port 4005");
});
