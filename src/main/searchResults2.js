const signInBtn = document.querySelector(".sign-in");

//sign in button selected goes to new page
if (signInBtn) {
    signInBtn.addEventListener("click", () => {
        window.location.href = "searchBar.html";
    });
}

//modify search button move back to flight search page
const modifySearchBtn = document.getElementById("modifySearchBtn");
if (modifySearchBtn) {
    modifySearchBtn.addEventListener("click", () => {
        window.location.href = "searchBar.html";
    });
}

//filters reset 
const filters =[
    document.getElementById("morningCheckbox"),
    document.getElementById("afternoonCheckbox"),
    document.getElementById("eveningCheckbox"),
    document.getElementById("noStopsCheckbox"),
    document.getElementById("oneStopCheckbox"),
    document.getElementById("multipleStopsCheckbox")
];
const priceRangeSlide = document.getElementById("priceRange");

const resetFilters = document.getElementById("resetFiltersBtn");
if(resetFilters){
    resetFilters.addEventListener("click", ()=>{
        filters.forEach(filter => {
            filter.checked = true;});
        priceRangeSlide.value = 600;
        });
    }