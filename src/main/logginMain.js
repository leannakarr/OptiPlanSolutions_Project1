import User from "../Classes/User.js";

// return to search page
const searchBarBtn = document.getElementById("returnSearchBar");

if (searchBarBtn) {
  searchBarBtn.addEventListener("click", () => {
    window.location.href = "searchBar.html";
  });
}

// sign in button
const signInBtn = document.querySelector(".sign-in");

if (signInBtn) {
  signInBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}

// register button
const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = new User(email, password);
    const message = user.register();

    document.getElementById("result").innerHTML = message;
  });
}

// login button
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = User.login(email, password);

    if (user) {
      document.getElementById("result").innerHTML =
        `Login Successful<br>Welcome ${user.email}`;
    } else {
      document.getElementById("result").innerHTML =
        "Invalid email or password";
    }
  });
}