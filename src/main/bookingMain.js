import { loadData } from "../Classes/loadData.js";
import Flight from "../Classes/Flight.js";

let loaded = false;

window.addEventListener("DOMContentLoaded", async () => {
    if (loaded) return;

    await loadData();
    loaded = true;

    const selectedFlightId = sessionStorage.getItem("selectedFlight");
    const selectedFlight = Flight.getFlightById(selectedFlightId);

    if (!selectedFlight) {
        alert("No flight found.");
        return;
    }

    const route = selectedFlight.route;

    document.getElementById("departureCode").textContent = route.departureAirport.airportCode;
    document.getElementById("departureCity").textContent = route.departureAirport.city;
    document.getElementById("departTime").textContent = selectedFlight.time;

    document.getElementById("arivalCode").textContent = route.arrivalAirport.airportCode;
    document.getElementById("arrivalCity").textContent = route.arrivalAirport.city;
    document.getElementById("arrivalTime").textContent = selectedFlight.arrivalTime || "9:30";
    
    const date = new Date(selectedFlight.date);
    const formattedDate = date.toLocaleDateString("en-AU", {
        weekday: "short",
        day: "numeric",
        month: "short"
    });

    document.getElementById("departDate").textContent = formattedDate;
    document.getElementById("arrivalDate").textContent = formattedDate;

    document.getElementById("departYear").textContent = date.getFullYear();
    document.getElementById("arrivalYear").textContent = date.getFullYear();
});


//ABN field is added if select traveling for business 
const travelForBussines = document.getElementById("travelFoBuss");
const abnField = document.getElementById("abnField");

travelForBussines.addEventListener("change", () => {

    if (travelForBussines.checked) {
        abnField.style.display = "flex";
    } else {
        abnField.style.display = "none";
    }

});
//load with no ABN field
if (!travelForBussines.checked) {
    abnField.style.display = "none";
}