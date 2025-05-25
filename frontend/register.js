document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const fileInput = document.getElementById("profile_pic");

    if (!firstname || !lastname || !email || !password) {
      alert("Please fill out all required fields.");
      return;
    }

    // Optional: Show uploaded file name
    const fileName =
      fileInput.files.length > 0 ? fileInput.files[0].name : "No file selected";

    alert(
      `Registration Info:\nFirst Name: ${firstname}\nLast Name: ${lastname}\nEmail: ${email}\nPassword: ${password}\nPicture: ${fileName}`
    );
  });
