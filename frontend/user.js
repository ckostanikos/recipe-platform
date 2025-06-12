const user = {
  full_name: "Maria Patsianotaki",
};

const dropdown = document.getElementById("userDropdown");
if (dropdown) {
  dropdown.textContent = user.full_name;
}

const logout = document.getElementById("logoutBtn");
if (logout) {
  logout.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Logging out...");
    window.location.href = "login.html";
  });
}

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
