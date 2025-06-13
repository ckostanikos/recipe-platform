function bufferToBase64(buffer) {
  const bytes = buffer.data;
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

document.addEventListener("DOMContentLoaded", function () {
  const recipeId = new URLSearchParams(window.location.search).get("id");
  const recipeContainer = document.getElementById("recipeContainer");
  const commentsList = document.getElementById("commentsList");
  const commentForm = document.getElementById("commentForm");
  const commentInput = document.getElementById("commentInput");

  // Load the recipe details
  fetch(`http://localhost:4016/api/recipes/${recipeId}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        const recipe = data.recipe;
        // Handle image from buffer
        let imageSrc = "images/default.jpg";
        if (recipe.image && recipe.image.data && recipe.image.data.length) {
          const base64 = bufferToBase64(recipe.image);
          imageSrc = `data:image/jpeg;base64,${base64}`;
        }
        // Handle chef/user (shows Unknown Chef if missing)
        const chefName = recipe.username || recipe.chef || "Unknown Chef";

        recipeContainer.innerHTML = `
          <div class="card mb-4 shadow-sm">
            <div class="row g-0">
              <div class="col-md-4 d-flex align-items-center justify-content-center">
                <img src="${imageSrc}" alt="${
          recipe.title
        }" class="img-fluid rounded" style="max-width: 300px;">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2 class="card-title">${recipe.title}</h2>
                  <p><b>By:</b> ${chefName}</p>
                  <p><b>Time:</b> ${recipe.production_time} min</p>
                  <h5>Ingredients</h5>
                  <ul>
                    ${(recipe.ingredients || [])
                      .map((ing) => `<li>${ing.ing_name}: ${ing.quantity}</li>`)
                      .join("")}
                  </ul>
                  <h5>Instructions</h5>
                  <p>${recipe.instructions}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        recipeContainer.innerHTML = `<div class="alert alert-danger">Recipe not found.</div>`;
      }
    });

  // Load comments
  function loadComments() {
    fetch(`http://localhost:4016/api/recipes/${recipeId}/comments`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          commentsList.innerHTML =
            data.comments
              .map(
                (c) =>
                  `<div class="mb-2"><b>${c.username}</b> (${new Date(
                    c.created
                  ).toLocaleString()}):<br>${c.comment}</div>`
              )
              .join("") || "<div class='text-muted'>No comments yet.</div>";
        }
      });
  }
  loadComments();

  // Post comment
  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const comment = commentInput.value.trim();
    if (!comment) return;
    fetch(`http://localhost:4016/api/recipes/${recipeId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ comment }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          commentInput.value = "";
          loadComments();
        } else {
          alert(data.error || "Could not post comment.");
        }
      });
  });
});
