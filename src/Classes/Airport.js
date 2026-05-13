export default class Airport{
    /* class airport has airport code name city and country it creates an id
    useing the unique code. the airport has a list of destinations, this will be 
    used in the search bar when offering recomendations when inputting the arival 
    location with refrence to the departure airports destenations list function add
    to destenations list used in route*/
    constructor(airportCode, airportName, city, country){
        this.airportCode = airportCode;
        this.airportName = airportName;
        this.city = city;
        this.country = country;
        this.id = "APT_" + this.airportCode;
        //destenations list used for search bar uses the departure airport list to recomend locations
        this.destenations = []
    }
    addDestination(airport){
        this.destenations.push(airport);
    }
}