const addBtn = document.getElementById("addIngredient");
const container = document.getElementById("ingredientsContainer");

addBtn.addEventListener("click", function () {
  const row = document.createElement("div");
  row.className = "row mb-2";
  row.innerHTML = `
      <div class="col">
        <input type="text" class="form-control" name="ing_name" placeholder="Ingredient Name" required>
      </div>
      <div class="col">
        <input type="text" class="form-control" name="quantity" placeholder="Quantity (e.g.100 Grammars)" required>
      </div>
    `;
  container.appendChild(row);
});

document
  .getElementById("recipeForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const instructions = document.getElementById("instructions").value.trim();
    const time = document.getElementById("time").value.trim();
    const photo = document.getElementById("photo").files[0];
    const ingredientNames = document.getElementsByName("ing_name");
    const ingredientQtys = document.getElementsByName("quantity");

    const ingredients = [];

    for (let i = 0; i < ingredientNames.length; i++) {
      const name = ingredientNames[i].value.trim();
      const qty = ingredientQtys[i].value.trim();

      if (!name || !qty) {
        alert("Please fill out all ingredient fields.");
        return;
      }

      ingredients.push({ ing_name: name, quantity: qty });
    }

    if (!title || !instructions || !time) {
      alert("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("instructions", instructions);
    formData.append("production_time", time);
    formData.append("image", photo);
    formData.append("ingredients", JSON.stringify(ingredients));

    try {
      const response = await fetch("http://localhost:4016/api/recipes", {
        method: "POST",
        credentials: "include", // needed for session cookie
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Recipe submitted successfully!");
        window.location.href = "mainPage.html";
      } else {
        alert(data.error || "Failed to submit recipe.");
      }
    } catch (err) {
      console.error("Error submitting recipe:", err);
      alert("An error occurred while submitting your recipe.");
    }
  });
