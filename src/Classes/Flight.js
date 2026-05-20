export default class Flight{
    /* class flight has two static lists one of all flights and a second with searched
    flights for flights that meet the flight consitions. flights have route, aircraft,
    date time and price. there are two methods one gives the information that appears
    when the flight is displayed as a searched option and the other displays the extra
    flight data when the flight is selected two static methods one fills the search flight
    array to have flights that meet the conditions the other sorts flights*/
    static flightList = [];
    static searchedFlightList = [];

    constructor(route, aircraft, date, time, price){
        this.id =`${route.id}_${date.replaceAll("-", "")}_${time.replace(":", "")}`;
        this.route = route;
        this.aircraft = aircraft;
        this.date = date;
        this.time = time;
        this.price = price;
        this.bookedSeats = [];
        this.bookingList = [];
        this.currentWeight = 0; 
        Flight.flightList.push(this);
    } 

    static getSearchedFlight(route, date){
        Flight.searchedFlightList = [];
        for(let f of Flight.flightList){
            if(f.route.id === route && f.date === date){
                Flight.searchedFlightList.push(f);
            }
        }
        return Flight.searchedFlightList;
    }

    //sort flight method will take the option of sought by and arainge the flights 
    //defult sort time
    static sortFlight(sortBy = "time"){
        if(sortBy==="time"){
            Flight.searchedFlightList.sort((a,b)=> a.time.localeCompare(b.time));}
        else if (sortBy === "time-reverse") {
            Flight.searchedFlightList.sort((a, b) => b.time.localeCompare(a.time));}   
        else if(sortBy === "price"){
            Flight.searchedFlightList.sort((a,b)=> a.price - b.price);}
        else if (sortBy === "price-reverse") {
            Flight.searchedFlightList.sort((a, b) => b.price - a.price);}
        }


    //html flight info display for the search options
createFlightCard() {
    const wrapper = document.createElement("div");
    wrapper.className = "flight-wrapper";

    const card = document.createElement("div");
    card.className = "flight-card";

    card.innerHTML = `
        <div class="airline-section">
            <div class="logo">✈</div>
            <div>
                <h3>FlyDreamAir</h3>
                <p>FDA 101</p>
                <p>Non-Stop</p>
            </div>
        </div>

        <div class="time-section">
            <div class="time-block">
                <h2>${this.time}</h2>
                <p>${this.route.departureAirport.airportCode}</p>
            </div>

            <div class="line-section">
                <p>1hr 30m</p>
                <div class="flight-line">
                    <span></span>
                    <span class="plane">✈</span>
                </div>
                <p>Non-Stop</p>
            </div>

            <div class="time-block">
                <h2>09:30</h2>
                <p>${this.route.arrivalAirport.airportCode}</p>
            </div>
        </div>

        <div class="price-section">
            <p>From</p>
            <h2>$${this.price}</h2>
        </div>

        <div class="button-section">
            <button>Select</button>
            <p class="view-details">View Details⌄</p>
        </div>
    `;

    const infoCard = this.createinformationCard1();
    infoCard.style.display = "none";

    const viewDetails = card.querySelector(".view-details");

    viewDetails.addEventListener("click", () => {
        if (infoCard.style.display === "none") {
            infoCard.style.display = "flex";
            viewDetails.textContent = "Hide Details⌃";
        } else {
            infoCard.style.display = "none";
            viewDetails.textContent = "View Details⌄";
        }
    });

    wrapper.appendChild(card);
    wrapper.appendChild(infoCard);

    return wrapper;
}

    //html flight information for when the flight is clicked on
    createinformationCard1() {
    const card = document.createElement("div");
    card.className = "info-card";

    card.innerHTML = `
        <div class="info-column">
            <h2>Flight Details</h2>

            <div class="info-row">
                <strong>FDA 101</strong>
                <span>1h 40m</span>
            </div>

            <div class="info-row">
                <strong>Stops</strong>
                <span>1 Stop (${this.route.arrivalAirport.airportCode})</span>
            </div>

            <div class="info-row">
                <strong>Aircraft</strong>
                <span>${this.aircraft.aircraftModel.modelString}</span>
            </div>
        </div>

        <div class="info-column">
            <h2>In-Flight Services</h2>

            <div class="info-row">
                <strong>Snacks, Drinks</strong>
                <span>Available</span>
            </div>

            <div class="info-row">
                <strong>Seat Selection</strong>
                <span>Available</span>
            </div>

            <div class="info-row">
                <strong>Extra Baggage</strong>
                <span>Available</span>
            </div>
        </div>

        <div class="info-column">
            <h2>Fare Type</h2>

            <div class="info-row">
                <strong>Economy</strong>
                <span></span>
            </div>

            <div class="info-row">
                <strong>Check Baggage</strong>
                <span>20kg</span>
            </div>

            <div class="info-row">
                <strong>Changable/Refundable</strong>
                <span>ⓘ</span>
            </div>
        </div>
    `;

    return card;
}



    //display method for flights that had been searched for 
   static displayFlights() {
    const container = document.getElementById("flightResultsContainer");
    const heading = document.getElementById("resultsHeading");

    container.innerHTML = "";
    heading.textContent = `${Flight.searchedFlightList.length} Flights Found`;

    for (let f of Flight.searchedFlightList) {
        container.appendChild(f.createFlightCard());
    }
}
    //create function to add the booking to the flight object
}

