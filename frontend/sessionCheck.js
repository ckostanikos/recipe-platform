document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:4016/api/auth/session", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.loggedIn) {
        window.location.href = "login.html"; // Redirect to login if not logged in
      }
    })
    .catch((err) => {
      // Optional: handle errors
      console.error("Session check failed:", err);
      window.location.href = "login.html";
    });
});
