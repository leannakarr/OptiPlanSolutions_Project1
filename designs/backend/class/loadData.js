import Airport from "./Airport.js";
import Route from "./Route.js";
import ModelSpecs from "./ModelSpecs.js";
import Aircraft from "./Aircraft.js";
import Flight from "./Flight.js";

export async function loadData() {
    const airportData = await fetch("./data/airports.json").then(res => res.json());
    const modelData = await fetch("./data/modelSpecs.json").then(res => res.json());
    const aircraftData = await fetch("./data/aircraft.json").then(res => res.json());
    const routeData = await fetch("./data/routes.json").then(res => res.json());
    const flightData = await fetch("./data/flights.json").then(res => res.json());

    const airports = {};
    const models = {};
    const aircrafts = {};
    const routes = {};

    for (let a of airportData) {
        airports[a.airportCode] = new Airport(
            a.airportCode,
            a.airportName,
            a.city,
            a.country
        );
    }

    for (let m of modelData) {
        models[m.modelId] = new ModelSpecs(
            m.modelId,
            m.totalSeats,
            m.takeOfWeight
        );
    }

    for (let a of aircraftData) {
        aircrafts[a.aircraftId] = new Aircraft(
            a.aircraftId,
            models[a.aircraftModel]
        );
    }

    for (let r of routeData) {
        const route = new Route(
            airports[r.departureAirport],
            airports[r.arrivalAirport],
            r.expectedTime
        );

        routes[route.id] = route;
    }

    for (let f of flightData) {
        new Flight(
            f.id,
            routes[f.route],
            aircrafts[f.aircraft],
            f.date,
            f.time,
            f.price
        );
    }
}