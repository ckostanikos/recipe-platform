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
  const mainBlock = document.getElementById("mainRecipeBlock");

  fetch(`http://localhost:4016/api/recipes/${recipeId}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        const recipe = data.recipe;
        let imageSrc =
          recipe.image && recipe.image.startsWith("data:")
            ? recipe.image
            : "images/default.jpg";
        const chefName = recipe.username || recipe.chef || "Unknown Chef";

        mainBlock.innerHTML = `
          <div class="card mb-4 shadow-sm p-4">
            <img src="${imageSrc}" alt="${recipe.title}" 
              class="img-fluid rounded mx-auto d-block mb-4" 
              style="max-width: 400px;">
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
              <hr>
              <div id="commentsSection">
                <h4>Comments</h4>
                <div id="commentsList"></div>
                <form id="commentForm" class="mt-3">
                  <textarea
                    id="commentInput"
                    class="form-control"
                    rows="2"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                  <button type="submit" class="btn btn-primary mt-2">Post Comment</button>
                </form>
                </div>
              </div>
            </div>
`;

        // Setup comments after DOM is updated!
        setupComments();
      } else {
        mainBlock.innerHTML = `<div class="alert alert-danger">Recipe not found.</div>`;
      }
    });

  function setupComments() {
    const commentsList = document.getElementById("commentsList");
    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");

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
  }
});
