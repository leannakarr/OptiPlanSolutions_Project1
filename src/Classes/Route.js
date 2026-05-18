export default class Route{
    /* class route  has departure and arival airport and the time, it creates 
    an id from the airport when a route is added the arival airport is added to 
    the departure airports destenation list*/
    static routes =[];
    constructor(departureAirport, arrivalAirport, expectedTime){
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.expectedTime = expectedTime;
        this.id = `${departureAirport.airportCode}_${arrivalAirport.airportCode}`;
        this.departureAirport.addDestination(arrivalAirport);
        Route.routes.push(this)
    }
    static getRoute(departureAirport, arrivalAirport){
    return Route.routes.find(route =>
        route.departureAirport === departureAirport && route.arrivalAirport === arrivalAirport) || null;
    }
}
