document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("recipeContainer");
  const searchInput = document.getElementById("searchInput");

  let allRecipes = [];

  // Fetch all recipes from the backend
  async function fetchRecipes() {
    try {
      const res = await fetch("http://localhost:4016/api/recipes", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        allRecipes = data.recipes;
        renderRecipes(allRecipes);
      } else {
        container.innerHTML = `<div class="alert alert-warning">No recipes found.</div>`;
      }
    } catch (err) {
      container.innerHTML = `<div class="alert alert-danger">Failed to fetch recipes.</div>`;
      console.error(err);
    }
  }

  // Render recipe cards
  function renderRecipes(recipes) {
    container.innerHTML = ""; // Clear old cards

    if (recipes.length === 0) {
      container.innerHTML = `<div class="alert alert-info">No recipes match your search.</div>`;
      return;
    }

    recipes.forEach((recipe) => {
      // Truncate instructions for preview
      let shortInstructions =
        recipe.instructions.length > 100
          ? recipe.instructions.substring(0, 100) + "..."
          : recipe.instructions;

      // If no image, use fallback
      let imageSrc =
        recipe.image && recipe.image.startsWith("data:")
          ? recipe.image
          : "images/default.jpg";

      // Card template
      const card = document.createElement("div");
      card.className = "card mb-4 shadow-sm recipe-card";
      card.style.cursor = "pointer";
      card.onclick = () => {
        window.location.href = `recipe.html?id=${recipe.id}`;
      };

      card.innerHTML = `
        <div class="row g-0">
          <div class="col-md-3 d-flex align-items-center justify-content-center">
            <img src="${imageSrc}" alt="${
        recipe.title
      }" class="img-fluid rounded recipe-img" style="max-width: 150px;">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h4 class="card-title mb-1">${recipe.title}</h4>
              <div class="mb-2 text-muted" style="font-size: 1rem;">
                <p><b>By:</b><a href="publicprofile.html?id=${
                  recipe.user_id
                }">${recipe.chef || "Unknown Chef"}</a></p>
                <span class="ms-3"><i class="bi bi-list-ul"></i> <b>Ingredients:</b> ${
                  recipe.ingredientCount || 0
                }</span>
                <span class="ms-3"><i class="bi bi-clock"></i> <b>Time:</b> ${
                  recipe.production_time || "-"
                } min</span>
              </div>
              <div>
                <b>Instructions</b><br>
                <span>${shortInstructions}</span>
              </div>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Search handler
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filtered = allRecipes.filter((r) =>
      r.title.toLowerCase().includes(query)
    );
    renderRecipes(filtered);
  });

  fetchRecipes();
});
