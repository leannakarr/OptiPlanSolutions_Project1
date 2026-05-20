const signInBtn = document.querySelector(".sign-in");

if (signInBtn) {
    signInBtn.addEventListener("click", () => {
        window.location.href = "searchBar.html";
    });
}

const modifySearchBtn = document.getElementById("modifySearchBtn");

if (modifySearchBtn) {
    modifySearchBtn.addEventListener("click", () => {
        window.location.href = "searchBar.html";
    });
}