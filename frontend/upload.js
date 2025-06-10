document.addEventListener("DOMContentLoaded", function () {
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
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const title = document.getElementById("title").value.trim();
      const instructions = document.getElementById("instructions").value.trim();
      const time = document.getElementById("time").value.trim();
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

        ingredients.push({ name, qty });
      }

      if (!title || !instructions || !time) {
        alert("Please fill out all fields.");
        return;
      }

      alert("Recipe submitted!");
      console.log({
        title,
        ingredients,
        instructions,
        time,
      });
    });
});
