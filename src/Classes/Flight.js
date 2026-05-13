class Flight{
    /* class flight has two static lists one of all flights and a second with searched
    flights for flights that meet the flight consitions. flights have route, aircraft,
    date time and price. there are two methods one gives the information that appears
    when the flight is displayed as a searched option and the other displays the extra
    flight data when the flight is selected two static methods one fills the search flight
    array to have flights that meet the conditions the other sorts flights*/
    static flightList = [];
    static searchedFlightList = [];

    constructor(id,route, aircraft, date, time, price){
        this.id = id;
        this.route = route;
        this.aircraft = aircraft;
        this.date = date;
        this.time = time;
        this.price = price;
        this.bookedSeats = [];
        this.currentWeight = 0; 
        Flight.flightList.push(this);
    } 

    static getSearchedFlight(route, date){
        Flight.searchedFlightList = [];
        for(let f of Flight.flightList){
            if(f.route === route && f.date === date){
                Flight.searchedFlightList.push(f);
            }
        }
    }

    //sort flight method will take the option of sought by and arainge the flights 
    //defult sort time
    static sortFlight(sortBy = "time"){
        if(sortBy==="time"){
            Flight.searchedFlightList.sort((a,b)=> a.time.localeCompare(b.time));}
        else if(sortBy === "price"){
            flight.searchedFlightList.sort((a,b)=> a.price - b.price);
        }
    }


    //html flight info display for the search options
    createflightCard(){
        const card = document.createElement("div");
        card.className = "flight-card";
        card.innerHTML = `
            <h3>${this.route.departureAirport.airportCode}
                → ${this.route.arrivalAirport.airportCode}</h3>

            <p>Date: ${this.date}</p>
            <p>Time: ${this.time}</p>
            <p>Price: $${this.price}</p>
        `;
    return card
    }

    //html flight information for when the flight is clicked on
    createinformationCard1(){
        const card = document.createElement("div");
        card.className = "info-card";
        card.innerHTML=`
        <p>
        <Strong>${this.flightid}</Strong></p>
        ${this.route.expectedTime}
        </p>

        <p> 
        <Strong>Stops</Strong>
        1 stop (${this.route.arrivalAirport.code})
        </p> | one <p/></>
        <p>
        <Stong>Aircraft</Strong> 
        ${this.aircraft.toString()} 
        <p/>
        `;
    }

    //display method for flights that had been searched for 
    static displayFlights(){
        const container = 
        document.getElementById("flightResults");

        container.innerHTML = "";
        for(let f of Flight.searchedFlightList){
            container.appendChild(f.createFlightCard());
        }
    } 
}

