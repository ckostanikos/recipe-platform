document.addEventListener("DOMContentLoaded", () => {
  const user = {
    full_name: "Maria Patsianotaki",
    recipes: [
      {
        id: 1,
        title: "Κρέπες",
        image: "images/crepes.jpg",
        production_time: 45,
        instructions: "Φτιάξε τις κρέπες με αυτές τις οδηγίες.",
        ingredients: [
          { ing_name: "Γάλα", quantity: "2 λίτρα" },
          { ing_name: "Αλεύρι", quantity: "300 γραμμάρια" },
          { ing_name: "Αυγά", quantity: "2" },
        ],
        comments: [{ user_full_name: "Christos", comment: "Καλό είναι." }],
      },
      {
        id: 2,
        title: "Κρέπες",
        image: "images/crepes.jpg",
        production_time: 30,
        instructions: "Φτιάξε τις κρέπες σε λιγότερο χρόνο.",
        ingredients: [
          { ing_name: "Γάλα", quantity: "2 λίτρα" },
          { ing_name: "Αλεύρι", quantity: "300 γραμμάρια" },
          { ing_name: "Αυγά", quantity: "2" },
        ],
        comments: [
          { user_full_name: "Maria", comment: "όταν αργω αυτο θα κανω " },
        ],
      },
    ],
  };

  document.getElementById("userName").textContent = user.full_name;
  document.getElementById("recipeCount").textContent = user.recipes.length;

  const container = document.getElementById("recipesList");

  user.recipes.forEach((recipe) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.className = "recipe-block";

    const ingredientList = recipe.ingredients
      .map((i) => `<li>${i.quantity} of ${i.ing_name}</li>`)
      .join("");

    const commentList = recipe.comments
      .map((c) => `<p>${c.comment} <strong>– ${c.user_full_name}</strong></p>`)
      .join("");

    recipeDiv.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" class="img-fluid rounded mb-3" alt="${
      recipe.title
    }">
      <p><strong>Time:</strong> ${recipe.production_time} minutes</p>
      <h5>Ingredients:</h5>
      <ul>${ingredientList}</ul>
      <h5>Instructions:</h5>
      <p>${recipe.instructions}</p>

      <div class="mt-4 border-top pt-3">
        <h6 class="mb-2">Comments</h6>
        <div class="comment-box">${
          commentList || "<p class='text-muted'>No comments yet.</p>"
        }</div>
        <form class="comment-form mt-3">
          <input type="text" class="form-control" placeholder="Write a comment..." required>
          <button type="submit" class="btn btn-primary btn-sm mt-2">Post Comment</button>
        </form>
      </div>
    `;

    container.appendChild(recipeDiv);
  });
});
