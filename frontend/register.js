document.addEventListener("DOMContentLoaded", function () {
  // Image preview
  document
    .getElementById("profile_pic")
    .addEventListener("change", function () {
      const file = this.files[0];
      const preview = document.getElementById("preview");
      if (!file) {
        preview.src = "images/default-avatar.jpg";
        return;
      }

      // Only JPG images, size < 1MB
      if (file.type !== "image/jpeg") {
        alert("Profile picture must be a JPG image.");
        this.value = "";
        preview.src = "images/default-avatar.jpg";
        return;
      }
      if (file.size > 1024 * 1024) {
        alert("Profile picture must be less than 1MB.");
        this.value = "";
        preview.src = "images/default-avatar.jpg";
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });

  document
    .getElementById("registerForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const firstname = document.getElementById("firstname").value.trim();
      const lastname = document.getElementById("lastname").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("pass").value.trim();
      const fileInput = document.getElementById("profile_pic");
      const profilePicFile = fileInput.files[0];

      // Validate fields
      if (!username || !firstname || !lastname || !email || !password) {
        alert("Please fill out all required fields.");
        return;
      }

      // Profile picture: required, type/size check
      if (!profilePicFile) {
        alert("Please select a profile picture (JPG, <1MB).");
        return;
      }
      if (profilePicFile.type !== "image/jpeg") {
        alert("Profile picture must be a JPG image.");
        return;
      }
      if (profilePicFile.size > 1024 * 1024) {
        alert("Profile picture must be less than 1MB.");
        return;
      }

      const formData = new FormData();
      formData.append("username", username);
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("pass", password);
      formData.append("profile_pic", profilePicFile);

      try {
        const res = await fetch("http://localhost:4016/api/auth/register", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.success) {
          alert("Registration Successful!");
          window.location.href = "login.html";
        } else {
          alert(data.error || "Registration failed.");
        }
      } catch (err) {
        console.error("Registration error:", err);
        alert("Something went wrong.");
      }
    });
});
