document.addEventListener("DOMContentLoaded", async () => {
  // Get user id from URL
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("id");
  if (!userId) {
    document.body.innerHTML =
      "<div class='alert alert-danger'>User not specified.</div>";
    return;
  }

  const userRes = await fetch(
    `http://localhost:4016/api/users/${encodeURIComponent(userId)}`
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
    <div class="recipe-block" style="cursor:pointer;" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" class="img-fluid rounded mb-3" alt="${recipe.title}">
      <span>
        <b>By</b>&nbsp;<a href="publicprofile.html?id=${recipe.user_id}">${recipe.chef}</a>
      </span>
      <p><strong>Time:</strong> ${recipe.production_time} minutes</p>
    </div>
  `
    )
    .join("");

  // Attach the click event to all cards
  document.querySelectorAll(".recipe-block").forEach((block) => {
    block.addEventListener("click", function (e) {
      // Don't redirect if clicking the username link
      if (e.target.closest("a")) return;
      const id = this.getAttribute("data-id");
      window.location.href = `recipe.html?id=${id}`;
    });
  });
});
