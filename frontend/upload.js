document.getElementById("recipeForm").addEventListener("submit");

const title = document.getElementById("title").value.trim();
const ingredients = document.getElementById("ingredients").value.trim();
const instructions = document.getElementById("instructions").value.trim();
const time = document.getElementById("time").value.trim();

if (!title || !ingredients || !instructions || !time) {
  alert("Please fill out all fields.");
  return;
}

alert("Recipe submitted!");
