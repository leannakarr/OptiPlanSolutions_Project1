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