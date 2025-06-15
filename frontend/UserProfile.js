document.addEventListener("DOMContentLoaded", async () => {
  const userRes = await fetch("http://localhost:4016/api/profile", {
    credentials: "include",
  });
  const userData = await userRes.json();

  if (!userData.success) {
    alert("Could not load user profile");
    return;
  }
  const user = userData.user;

  document.getElementById("userName").textContent = user.username;
  document.getElementById(
    "userFullName"
  ).textContent = `${user.firstname} ${user.lastname}`;
  document.getElementById("profilePic").src =
    user.profile_pic || "images/default-avatar.jpg";

  const recipesRes = await fetch("http://localhost:4016/api/my-recipes", {
    credentials: "include",
  });
  const recipesData = await recipesRes.json();

  if (!recipesData.success) {
    document.getElementById(
      "recipesList"
    ).innerHTML = `<div class="alert alert-warning">No recipes found.</div>`;
    document.getElementById("recipeCount").textContent = "0";
    return;
  }

  const recipes = recipesData.recipes;
  document.getElementById("recipeCount").textContent = recipes.length;

  const container = document.getElementById("recipesList");
  container.innerHTML = "";

  recipes.forEach((recipe) => {
    let imageSrc =
      recipe.image && recipe.image.startsWith("data:")
        ? recipe.image
        : "images/default.jpg";
    let ingredientTotal =
      recipe.ingredientCount !== undefined ? recipe.ingredientCount : 0;
    container.innerHTML += `
      <a href="recipe.html?id=${recipe.id}" class="text-decoration-none text-dark">
        <div class="recipe-block mb-4 shadow-sm">
          <h3>${recipe.title}</h3>
          <img src="${imageSrc}" class="img-fluid rounded mb-3" alt="${recipe.title}">
          <p><strong>Time:</strong> ${recipe.production_time} minutes</p>
          <div><strong>Ingredients:</strong> ${ingredientTotal} ingredients</div>
        </div>
      </a>
    `;
  });
});
