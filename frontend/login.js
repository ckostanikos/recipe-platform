document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault(); // Prevent form from reloading the page

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }
      try {
        const res = await fetch("http://localhost:4016/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // For cookie session
          body: JSON.stringify({ email, pass: password }),
        });

        const data = await res.json();

        if (res.ok) {
          // alert(`Welcome back, ${data.username}!`);
          window.location.href = "mainPage.html"; // redirect to main page
        } else {
          alert(data.error || "Login failed.");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Something went wrong.");
      }
    });
});
