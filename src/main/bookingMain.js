import { loadData } from "../Classes/loadData.js";
import Flight from "../Classes/Flight.js";
import Booking from "../Classes/Booking.js";
import Ticket from "../Classes/Tickets.js";

let loaded = false;
let currentBooking = null;

window.addEventListener("DOMContentLoaded", async () => {
    if (loaded) return;

    await loadData();
    loaded = true;

    const selectedFlightId = sessionStorage.getItem("selectedFlight");

    console.log("All flights:", Flight.flightList);
    console.log("Selected flight ID:", selectedFlightId);

    if (!selectedFlightId) {
        alert("No selected flight ID found.");
        return;
    }

    const selectedFlight = Flight.getFlightById(selectedFlightId);

    console.log("Selected flight:", selectedFlight);

    if (!selectedFlight) {
        alert("No flight found.");
        return;
    }

    const route = selectedFlight.route;

    document.getElementById("departureCode").textContent = route.departureAirport.airportCode;
    document.getElementById("departureCity").textContent = route.departureAirport.city;
    document.getElementById("departureTime").textContent = selectedFlight.time;

    document.getElementById("arrivalCode").textContent = route.arrivalAirport.airportCode;
    document.getElementById("arrivalCity").textContent = route.arrivalAirport.city;
    document.getElementById("arrivalTime").textContent = selectedFlight.arrivalTime || "9:30";

    const date = new Date(selectedFlight.date);

    const formattedDate = date.toLocaleDateString("en-AU", {
        weekday: "short",
        day: "numeric",
        month: "short"
    });

    document.getElementById("departureDate").textContent = formattedDate;
    document.getElementById("arrivalDate").textContent = formattedDate;
    document.getElementById("departureYear").textContent = date.getFullYear();
    document.getElementById("arrivalYear").textContent = date.getFullYear();

    const searchData = JSON.parse(sessionStorage.getItem("flightSearch"));

    const adultCount = Number(searchData.adults);
    const childCount = Number(searchData.children);
    const infantCount = Number(searchData.infants);

    document.getElementById("numberAdults").textContent = adultCount + " Adult ticket";
    document.getElementById("adultCost").textContent = "$"+(selectedFlight.price *adultCount);

    if(childCount!="0"){
        document.getElementById("numberChildren").textContent = childCount + " Child ticket";
        document.getElementById("childrenCost").textContent = "$"+(selectedFlight.price *childCount);
    }
    if(infantCount!="0"){
        document.getElementById("infantNumbers").textContent = infantCount + " Infant ticket";
        document.getElementById("noCost").textContent = "$0";

    }
    const numberOfTickets = adultCount + childCount + infantCount;
    const ticketSubtotal = selectedFlight.price * numberOfTickets;
    let taxAmount = ticketSubtotal * Booking.tax;
    document.getElementById("tax").textContent = "$"+taxAmount.toFixed(2);
    const bookingTotal = ticketSubtotal + taxAmount;
    document.getElementById("totalPrice").textContent = "$"+bookingTotal.toFixed(2);

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

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const DOB = document.getElementById("DOB");
const phone = document.getElementById("phone");
const postCode = document.getElementById("postCode");


const createTicket = document.getElementById("submintInfo");

if(createTicket){
    createTicket.addEventListener("click", () =>{
        pfirstName = firstName.ariaValueMax()

    })
}