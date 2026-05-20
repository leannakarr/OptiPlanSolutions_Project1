import Flight from "../Classes/Flight.js";
import { loadData } from "../Classes/loadData.js";

let loaded = false;

window.addEventListener("DOMContentLoaded", async () => {
    if (!loaded) {
        await loadData();
        loaded = true;

        const searchData = JSON.parse(sessionStorage.getItem("flightSearch"));
        if (!searchData) {
            alert("No flight search data found.");
            return;
        }

    Flight.getSearchedFlight(searchData.routeid, searchData.departureDate);

    Flight.sortFlight("time");
    Flight.displayFlights();


    console.log("Search data:", searchData);
    console.log("Matching flights:", Flight.searchedFlightList);
    }
});

//get list of flights that fit the conditions
//const flightResultList = flight.


const signInBtn = document.querySelector(".sign-in");

//sign in button selected goes to new page
if (signInBtn) {
    signInBtn.addEventListener("click", () => {
        window.location.href = "searchBar.html";
    });
}

//change order of results
const sortSelect = document.getElementById("sortSelect");

if (sortSelect) {
    sortSelect.addEventListener("change", () => {
        Flight.sortFlight(sortSelect.value);
        Flight.displayFlights();
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

//get list of flights that fit the conditions
//const flightResultList = flight.