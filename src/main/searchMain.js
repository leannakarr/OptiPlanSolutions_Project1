import { loadData } from "../Classes/loadData.js";
import { Routes } from "../Classes/Routes.js";

// passenger popup
const passengerBtn = document.getElementById("passengerBtn");
const passengerPopup = document.getElementById("passengerPopup");

if (passengerBtn && passengerPopup) {
  passengerBtn.addEventListener("click", () => {
    passengerPopup.classList.toggle("show");
  });
} else {
  console.log("Passenger button or popup not found");
}

//need autofill for departure and arival 
// get all elements