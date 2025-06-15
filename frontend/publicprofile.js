document.addEventListener("DOMContentLoaded", async () => {
  // Get user id from URL
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("id");
  if (!userId) {
    document.body.innerHTML =
      "<div class='alert alert-danger'>User not specified.</div>";
    return;
  }

  // Fetch user public profile
  const userRes = await fetch(
    `http://localhost:4016/api/public-profile?id=${encodeURIComponent(userId)}`
  );
  const userData = await userRes.json();

  if (!userData.success) {
    document.body.innerHTML =
      "<div class='alert alert-danger'>User not found.</div>";
    return;
  }
  const user = userData.user;

  // Set user info
  document.getElementById("userName").textContent = user.username;
  document.getElementById(
    "userFullName"
  ).textContent = `${user.firstname} ${user.lastname}`;
  document.getElementById("profilePic").src =
    user.profile_pic || "images/default-avatar.jpg";

  // Recipes
  const recipes = userData.recipes || [];
  document.getElementById("recipeCount").textContent = recipes.length;

  const container = document.getElementById("recipesList");
  if (recipes.length === 0) {
    container.innerHTML =
      "<div class='alert alert-warning'>No recipes found.</div>";
    return;
  }

  container.innerHTML = recipes
    .map(
      (recipe) => `
    <div class="recipe-block">
      <a href="recipe.html?id=${recipe.id}">
        <h3>${recipe.title}</h3>
        <img src="${
          recipe.image && recipe.image.startsWith("data:")
            ? recipe.image
            : "images/default.jpg"
        }" class="img-fluid rounded mb-3" alt="${recipe.title}">
      </a>
      <p><strong>Time:</strong> ${recipe.production_time} minutes</p>
    </div>
  `
    )
    .join("");
});
