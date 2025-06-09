document.addEventListener("DOMContentLoaded", function () {
  const recipes = [
    {
      title: "Classic Burger",
      chef: "Chef Maria Patsianotaki",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2097&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ingredients: [
        "Bread",
        "Tomato",
        "Lettuce",
        "Ground Beef",
        "Cheese",
        "Onion",
        "Sauce",
      ],
      instructions:
        "Do this do that make this cook that hahahaha so funny so many things.",
    },
    {
      title: "Copy Classic Burger",
      chef: "Chef Christos Kostanikos",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2097&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ingredients: ["Bread", "Lettuce", "Ground Beef", "Cheese", "Sauce"],
      instructions:
        "Do this do that make this cook that hahahaha so funny so many things.",
    },
  ];

  const container = document.getElementById("recipeContainer");

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("row", "recipe-card");

    card.innerHTML = `
      <div class="col-md-3 text-center">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
      </div>
      <div class="col-md-9">
        <h3>${recipe.title}</h3>
        <p><strong>By ${recipe.chef}</strong></p>
        <h6><strong>Ingredients</strong></h6>
        <ul class="ingredients-list">
          ${recipe.ingredients.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <h6><strong>Instructions</strong></h6>
        <p>${recipe.instructions}</p>
      </div>
    `;

    container.appendChild(card);
  });
});
