document.getElementById("profileForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  console.log("Saving data:", data);

  alert("Changes saved (not actually submitted yet).");
});

document.querySelector(".DeleteButton").addEventListener("click", function () {
  if (confirm("Are you sure you want to delete your profile?")) {
    console.log("Deleting profile");

    alert("Profile deleted (not actually deleted yet).");
  }
});
