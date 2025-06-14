document.addEventListener("DOMContentLoaded", function () {
  // SESSION CHECK
  fetch("http://localhost:4016/api/auth/session", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.loggedIn) {
        window.location.href = "login.html";
      }
    })
    .catch((err) => {
      console.error("Session check failed:", err);
      window.location.href = "login.html";
    });

  // LOGOUT BUTTON HANDLER
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (!confirm("Are you sure you want to log out?")) {
        return;
      }
      fetch("http://localhost:4016/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .then(() => {
          window.location.href = "login.html";
        })
        .catch(() => {
          alert("Logout failed!");
        });
    });
  }

  // LITTLE CHEFS LOGO REDIRECT
  const logo = document.querySelector(".navbar-brand");
  if (logo) {
    logo.style.cursor = "pointer";
    logo.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "mainpage.html";
    });
  }
});
