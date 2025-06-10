window.addEventListener("DOMContentLoaded", () => {
  const user = {
    username: "MariaPatsianotaki",
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
      },
      {
        id: 2,
        title: "Krepes",
        image: "images/crepes.jpg",
        production_time: 30,
        instructions: "Κάντο από την αρχή σε λιγότερο χρόνο.",
        ingredients: [
          { ing_name: "Γάλα", quantity: "2 λίτρα" },
          { ing_name: "Αλεύρι", quantity: "300 γραμμάρια" },
          { ing_name: "Αυγά", quantity: "2" },
        ],
      },
    ],
  };

  document.getElementById("userName").textContent = user.full_name;
  document.getElementById("recipeCount").textContent = user.recipes.length;
  document.getElementById("userDropdown").textContent = user.full_name;

  const container = document.getElementById("recipesList");

  user.recipes.forEach((recipe) => {
    const div = document.createElement("div");
    div.className = "recipe-block";

    const ingredientList = recipe.ingredients
      .map((i) => `<li>${i.quantity} of ${i.ing_name}</li>`)
      .join("");

    div.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}">
      <p><strong>Time:</strong> ${recipe.production_time} minutes</p>
      <h5>Ingredients:</h5>
      <ul>${ingredientList}</ul>
      <h5>Instructions:</h5>
      <p>${recipe.instructions}</p>
    `;

    container.appendChild(div);
  });

  document.getElementById("logoutBtn").addEventListener("click", function (e) {
    e.preventDefault();
    alert("Logging out...");
    window.location.href = "login.html";
  });
});
