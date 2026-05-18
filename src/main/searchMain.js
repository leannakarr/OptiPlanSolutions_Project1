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
const bookingType = document.getElementById("bookingType");
const departureDate = document.getElementById("departureDate");
const noAdult = document.getElementById("adults");
const noChildren = document.getElementById("children");
const noInfints = document.getElementById("infants");
const searchBtn = document.getElementById("search");

searchBn.addEventListener("click", (event) => {
  const bookingType =document.querySelector('input[name="trip"]:checked').value;
  const bRoute = Route.getRoute(departureInput.value, arrivalInput.value);
  const bAdults = noAdult.value;
  const bChildren = noChildren.value;
  const bInfints = noInfints.value;
  if(bookingType.value === "return"){

  }
})
