document.getElementById("profileForm").addEventListener("submit", function (e) {
  e.preventDefault();

  alert("Changes saved (not actually submitted yet).");
});

document.querySelector(".btn-red").addEventListener("click", function () {
  if (confirm("Are you sure you want to delete your profile?")) {
    alert("Profile deleted (not actually deleted yet).");
  }
});
