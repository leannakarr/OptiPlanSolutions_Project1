class Route{
    constructor(departureAirport, arrivalAirport, expectedTime){
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.expectedTime = expectedTime;
        this.id = `${departureAirport.airportCode}_${arrivalAirport.airportCode}`;
        this.departureAirport.addDestination(arrivalAirport);
    }
}
