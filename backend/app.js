// Core imports
import express from "express";
import cors from "cors";
import session from "express-session";
import commentRoutes from "./routes/comment.route.js";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import recipeRoutes from "./routes/recipe.route.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5500"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "best-ever-web-app",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);

// 4️⃣ ROUTES
app.use("/api", authRoutes);
app.use("/api", recipeRoutes);
app.use("/api", userRoutes);
app.use("/api", commentRoutes);

app.get("/", (req, res) => {
  res.send("✅ Little Chefs backend is running.");
});

// 6️⃣ ERROR HANDLER (last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// 7️⃣ START SERVER
app.listen(4016, () => {
  console.log("Server is running on port 4016");
});
