document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("registerForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault(); // Prevent form from reloading the page

      const username = document.getElementById("username").value.trim();
      const firstname = document.getElementById("firstname").value.trim();
      const lastname = document.getElementById("lastname").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("pass").value.trim();
      const fileInput = document.getElementById("profile_pic");

      if (!username || !firstname || !lastname || !email || !password) {
        alert("Please fill out all required fields.");
        return;
      }
      const profile_pic =
        fileInput.files.length > 0 ? fileInput.files[0].name : "default.jpg";

      try {
        const res = await fetch("http://localhost:4016/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            firstname,
            lastname,
            email,
            pass: password,
            profile_pic,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          alert(`Registration Successful!`);
          window.location.href = "login.html"; // redirect to login page
        } else {
          alert("Registration failed.");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Something went wrong.");
      }
    });
});
