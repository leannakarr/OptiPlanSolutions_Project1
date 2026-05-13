class Flight{
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
        this.searchedFlightList = [];
        for(let f of Flight.flightList){
            if(f.route === route && f.date === date){
                Flight.searchedFlightList.push(f);
            }
        }
    }

    static sortFlight(sortBy){
        if(sortBy==="time"){
            Flight.flightList.sort((a,b)=> a.time.localeCompare(b.time));}
        else if(sortBy === "price"){
            flight.flightList.sort((a,b)=> a.price - b.price);
        }
    }


    //html flight info display card
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

    static displayFlights(){
        const container = 
        document.getElementById("flightResults");

        container.innerHTML = "";
        for(let f of Flight.searchedFlightList){
            container.appendChild(f.createCard());
        }
    } 
}

