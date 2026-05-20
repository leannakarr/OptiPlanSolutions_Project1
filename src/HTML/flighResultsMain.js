import { loadData } from "../Classes/loadData.js";
import Flight from "../Classes/Flight.js";
import Route from "../Classes/Route.js";

let loaded = false;

window.addEventListener("DOMContentLoaded", async () => {
    if (loaded) {
        return;
    }

    await loadData();
    loaded = true;

    //get data from search bar
    const searchData = JSON.parse(sessionStorage.getItem("flightSearch"));
    if(!searchData){
        allert("No flight searched for");
    }

    const route = Route.getRouteById(searchData.route);
    document.getElementById("routeTitle").innerHTML = route.toString();

    Flight.getSearchedFlight(route, searchData.departureDate);
    Flight.displayFlights();})