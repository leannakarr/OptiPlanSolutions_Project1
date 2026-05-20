import { loadData } from "../Classes/loadData.js";
import Airport from "../Classes/Airport.js";
import Route from "../Classes/Route.js";


// passenger popup input fieild
const passengerBtn = document.getElementById("passengerBtn");
const passengerPopup = document.getElementById("passengerPopup");

if (passengerBtn && passengerPopup) {

  // open/close pasager input pop up
  passengerBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    passengerPopup.classList.toggle("show");
  });

  // stop popup closing when clicking inside it
  passengerPopup.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // close popup when clicking anywhere else
  document.addEventListener("click", () => {
    passengerPopup.classList.remove("show");
  });

}

//second date field disapears when select one way
const tripRadios = document.querySelectorAll('input[name="trip"]');

tripRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    const bookingType = document.querySelector('input[name="trip"]:checked').value;

    if (bookingType === "oneway") {
      returnDate.style.display = "none";
      returnDate.value = "";
    } else {
      returnDate.style.display = "inline-block";
    }
  });
});

// airport search 
const departureInput = document.querySelector('input[placeholder="Departure Location"]');
const arrivalInput = document.querySelector('input[placeholder="Arrival Location"]');

await loadData();

const airports = Airport.airportList;
//add to departure list
const departureList = document.createElement("datalist");
departureList.id = "departureOptions";
document.body.appendChild(departureList);
departureInput.setAttribute("list", "departureOptions");

airports.forEach(airport => {
  const option = document.createElement("option");
  option.value = airport.city;
  departureList.appendChild(option);
});

// arrival suggestions
const arrivalList = document.createElement("datalist");
arrivalList.id = "arrivalOptions";
document.body.appendChild(arrivalList);
arrivalInput.setAttribute("list", "arrivalOptions");

// update arrivals based on departure
departureInput.addEventListener("change", () => {
  const selectedDepartureCity = departureInput.value;

  arrivalInput.value = "";
  arrivalList.innerHTML = "";

  const departureAirport = airports.find(
    airport => airport.city === selectedDepartureCity
  );

  if (!departureAirport) {
    return;
  }

  departureAirport.destinations.forEach(destinationAirport => {
    const option = document.createElement("option");
    option.value = destinationAirport.city;
    arrivalList.appendChild(option);
  });
});

// stop invalid arrival
arrivalInput.addEventListener("change", () => {
  const selectedDepartureCity = departureInput.value;
  const selectedArrivalCity = arrivalInput.value;

  const departureAirport = airports.find(
    airport => airport.city === selectedDepartureCity
  );

  if (!departureAirport) {
    alert("Please choose a valid departure city.");
    departureInput.value = "";
    arrivalInput.value = "";
    return;
  }

  const validArrival = departureAirport.destinations.some(
    destinationAirport => destinationAirport.city === selectedArrivalCity
  );

  if (!validArrival) {
    alert("Please choose a valid destination for this departure city.");
    arrivalInput.value = "";
  }
});

//get infomation when search button is clicked
const departureDate = document.getElementById("departureDate");
const returnDate = document.getElementById("returnDate");

const noAdult = document.getElementById("adults");
const noChildren = document.getElementById("children");
const noInfants = document.getElementById("infants");

const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const checkedTrip = document.querySelector('input[name="trip"]:checked');

  if (!checkedTrip) {
    alert("Please select one-way or return.");
    return;
  }

  const bookingType = checkedTrip.value;

  const departureAirport = Airport.airportList.find(
    airport => airport.city === departureInput.value
  );

  const arrivalAirport = Airport.airportList.find(
    airport => airport.city === arrivalInput.value
  );

  if (!departureAirport || !arrivalAirport) {
    alert("Please choose valid departure and arrival cities.");
    return;
  }

  const bRoute = Route.getRoute(departureAirport, arrivalAirport);
  const routeId = bRoute.id;

  if (!bRoute) {
    alert("No route found for these airports.");
    return;
  }

  console.log("Booking type:", bookingType);
  console.log("Route:", bRoute);
  console.log("Departure date:", departureDate.value);
  console.log("Return date:", returnDate.value);
  console.log("Adults:", noAdult.value);
  console.log("Children:", noChildren.value);
  console.log("Infants:", noInfants.value);
  
  const searchData = {
    bookingType: bookingType,
    departureAirport: departureAirport.city,
    arrivalAirport: arrivalAirport.city,
    routeid: routeId,
    departureDate: departureDate.value,
    returnDate: returnDate.value,
    adults: noAdult.value,
    children: noChildren.value,
    infants: noInfants.value
  };
  sessionStorage.setItem("flightSearch", JSON.stringify(searchData));
  window.location.href = "searchResults2.html";
});

const oldSearchData = JSON.parse(sessionStorage.getItem("flightSearch"));
const modifySearch = sessionStorage.getItem("modifySearch");

if (modifySearch === "true" && oldSearchData) {
    // put old values back into the search form
    departureDate.value = oldSearchData.departureDate;
    returnDate.value = oldSearchData.returnDate;
    noAdult.value = oldSearchData.adults;
    noChildren.value = oldSearchData.children;
    noInfants.value = oldSearchData.infants;

    sessionStorage.removeItem("modifySearch");
}