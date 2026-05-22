import { loadData } from "../Classes/loadData.js";
import Flight from "../Classes/Flight.js";
import Booking from "../Classes/Booking.js";
import Ticket from "../Classes/Tickets.js";
import Passenger from "../Classes/Passenger.js";

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

let currentPassengerNumber = 1;
const tickets = [];

const searchData = JSON.parse(sessionStorage.getItem("flightSearch"));

const adultCount = Number(searchData.adults);
const childCount = Number(searchData.children);
const infantCount = Number(searchData.infants);

const totalPassengers = adultCount + childCount + infantCount;

const passengerHeading = document.getElementById("passengerType");
const createTicket = document.getElementById("submitInfo");

function getPassengerType(number) {
  if (number <= adultCount) {
    return "ADULT";
  } else if (number <= adultCount + childCount) {
    return "CHILD";
  } else {
    return "INFANT";
  }
}

function updatePassengerHeading() {
  passengerHeading.textContent = `PASSENGER ${currentPassengerNumber}: ${getPassengerType(currentPassengerNumber)}`;
}

function clearPassengerFields() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("DOB").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("postCode").value = "";
  document.getElementById("ABN").value = "";
  document.getElementById("travelFoBuss").checked = false;
}

updatePassengerHeading();

createTicket.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const DOB = document.getElementById("DOB").value;
  const gender = document.getElementById("gender").value;
  const nationality = document.querySelector("#nationality select").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const postCode = document.getElementById("postCode").value;

  const travelForBusiness = document.getElementById("travelFoBuss").checked;
  const ABN = travelForBusiness
    ? document.getElementById("ABN").value
    : null;

  const passenger = new Passenger(title, firstName, lastName, DOB, gender, nationality, email, phone, postCode, ABN);
  //update to ticket list and push ticket with passager object. 
  const selectedFlightId = sessionStorage.getItem("selectedFlight");
  const selectedFlight = Flight.getFlightById(selectedFlightId);
  const ticket = new Ticket(passenger, selectedFlight, null, null, null, null);
  tickets.push(ticket);

  console.log("Tickets:", ticket);

  if (currentPassengerNumber < totalPassengers) {
    currentPassengerNumber++;
    clearPassengerFields();
    updatePassengerHeading();
  } else {
    booking = new Booking(selectedFlight, null, tickets)
    sessionStorage.setItem("passengers", JSON.stringify(tickets));
    window.location.href = "payment.html";
  }
});

function setupPopup(buttonId, popupId) {
  const button = document.getElementById(buttonId);
  const popup = document.getElementById(popupId);

  if (!button || !popup) return;

  button.addEventListener("click", (event) => {
    event.stopPropagation();

    document.querySelectorAll(".addon-popup").forEach(p => {
      p.classList.remove("show");
    });

    const rect = button.getBoundingClientRect();

    popup.style.left = rect.left + "px";
    popup.style.top = rect.bottom + 8 + "px";

    popup.classList.add("show");
  });

  popup.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

setupPopup("addSeatSelect", "seatPopup");
setupPopup("addBagSelect", "bags");
setupPopup("addMeanSelect", "mealPopup");

document.addEventListener("click", () => {
  document.querySelectorAll(".addon-popup").forEach(popup => {
    popup.classList.remove("show");
  });
});