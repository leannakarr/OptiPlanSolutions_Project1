import User from "../Classes/User.js"

const searchBarBtn = document.getElementById("returnSearchBar");
if (searchBarBtn) {
    searchBarBtn.addEventListener("click", () => {
        window.location.href = "searchBar.html";
    });
}
const signInBtn = document.querySelector(".sign-in");

//sign in button selected goes to new page
if (signInBtn) {
    signInBtn.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}
import User from "../Classes/User.js";

document.getElementById("registerBtn").addEventListener("click", () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = new User(email, password);

  const message = user.register();

  document.getElementById("result").innerHTML = message;
});

document.getElementById("loginBtn").addEventListener("click", () => {

  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = User.login(username, password);

  if (user) {
    document.getElementById("result").innerHTML =
      `Login Successful<br>Welcome ${user.email}`;
  } else {
    document.getElementById("result").innerHTML =
      `Invalid email or password`;
  }

});
