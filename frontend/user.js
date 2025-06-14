document.addEventListener("DOMContentLoaded", () => {
  // LOAD USER PROFILE
  fetch("http://localhost:4016/api/profile", { credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        const user = data.user;
        document.getElementById("firstname").value = user.firstname;
        document.getElementById("lastname").value = user.lastname;
        document.getElementById("email").value = user.email;

        // Show image or fallback
        const preview = document.getElementById("profilePreview");
        if (user.profile_pic) {
          // Backend should return base64 image: "data:image/jpeg;base64,..."
          preview.src = user.profile_pic;
        } else {
          preview.src = "images/default-avatar.jpg";
        }
      }
    });

  // Image preview on file select
  document
    .getElementById("profile_pic")
    .addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("profilePreview").src = e.target.result;
      };
      reader.readAsDataURL(file);
    });

  // Enable/disable password field
  document.getElementById("changePass").addEventListener("change", function () {
    const passInput = document.getElementById("pass");
    passInput.disabled = !this.checked;
    if (!this.checked) passInput.value = ""; // Clear if unchecked
  });

  // Form submit: Only include password if changing it
  document
    .getElementById("profileForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);

      // Only append password if enabled and filled
      const changePass = document.getElementById("changePass").checked;
      if (!changePass) {
        formData.delete("pass");
      } else if (!formData.get("pass")) {
        alert("Please enter a new password or uncheck 'Change Password'.");
        return;
      }

      // SAVE PROFILE
      fetch("http://localhost:4016/api/profile", {
        method: "PUT",
        credentials: "include",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Profile updated!");
          } else {
            alert(data.error || "Update failed");
          }
        });
    });

  // DELETE PROFILE
  document
    .querySelector(".DeleteButton")
    .addEventListener("click", function () {
      if (
        confirm(
          "Are you sure you want to delete your profile? This cannot be undone."
        )
      ) {
        fetch("http://localhost:4016/api/profile", {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert("Profile deleted.");
              window.location.href = "register.html";
            } else {
              alert(data.error || "Could not delete profile.");
            }
          });
      }
    });
});
