class Airport{
    constructor(airportCode, airportName, city, country){
        this.airportCode = airportCode;
        this.airportName = airportName;
        this.city = city;
        this.country = country;
        this.id = "APT_" + this.airportCode;
        this.destenations = []
    }
    addDestination(airport){
        this.destenations.push(airport);
    }
}