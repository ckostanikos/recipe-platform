function signIn() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  if (email === "chef@example.com" && password === "secret") {
    alert("Welcome back, Chef!");
  } else {
    alert("Invalid credentials. Please try again.");
  }
}
