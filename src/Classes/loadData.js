//import the class flies to use to format data
import Airport from "./Airport.js";
import Route from "./Route.js";
import ModelSpecs from "./ModelSpecs.js";
import Aircraft from "./Aircraft.js";
import Flight from "./Flight.js";

//get json filed
export async function loadData() {
    const airportData = await fetch("../Data/airports.json").then(res => res.json());
    const modelData = await fetch("../Data/modelSpecs.json").then(res => res.json());
    const aircraftData = await fetch("../Data/aircraft.json").then(res => res.json());
    const routeData = await fetch("../Data/routes.json").then(res => res.json());
    const flightData = await fetch("../Data/flights.json").then(res => res.json());

    //create object arrays flights load into flight class
    const airports = {};
    const models = {};
    const aircrafts = {};
    const routes = {};

    //for the airport json create an airport object useing class constructior add it to airports with value code
    for (let a of airportData) {
        airports[a.code] = new Airport(a.code, a.name, a.city, a.country);
    }

    //for model json create a model object useing class constructor and have value as model id 
    for (let m of modelData) {
        models[m.modelId] = new ModelSpecs(m.modelId, m.modelString, m.totalSeats, m.takeOfWeight);
    }

    //for aircraft use constructor to add aircraft refrence model with same modelID
    for (let a of aircraftData) {
        aircrafts[a.aircraftId] = new Aircraft(a.aircraftId, models[a.aircraftModel]);
    }

    //for route use the airport arial and departure loaction codes to get objects from route list and add expected time
    for (let r of routeData) {
        const route = new Route(airports[r.departureAirport], airports[r.arrivalAirport], r.expectedTime);
        routes[route.id] = route;
    }

    //from flight json get the information, add objects route and aircraft by adding thier object from lists the flight constructer adds it to Flight.flightList
    for (let f of flightData) {
        new Flight(routes[f.route], aircrafts[f.aircraft], f.date, f.time, f.price);
    }
}