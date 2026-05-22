export default class Ticket {

  constructor(passenger, flight, seat, luggage, foodItems = [], drinkItems = [], aditionalAssistance = null) {
    this.passenger = passenger;
    this.flight = flight;
    this.seat = seat;
    this.luggage = luggage;
    this.foodItems = foodItems;
    this.drinkItems = drinkItems;
    this.aditionalAssistance = aditionalAssistance;

    if (this.seat) {
      this.seat.bookSeat();
    }
  }

  ticketCost() {
    let total = this.flight.price;

    if (this.seat != null) {
      total += 15;
    }

    if (this.luggage == "20") {
      total += 0;
    } else if (this.luggage == "30") {
      total += 53;
    } else if (this.luggage == "40") {
      total += 78;
    }

    for (let f of this.foodItems) {
      total += 20;
    }

    for (let d of this.drinkItems) {
      total += 5;
    }

    return total;
  }

  createTicketSummaryCard() {

    const card = document.createElement("div");
    card.className = "ticket-summary-card";

    const foodText = this.foodItems.length > 0
      ? this.foodItems.join(", ")
      : "None";

    const drinkText = this.drinkItems.length > 0
      ? this.drinkItems.join(", ")
      : "None";

    const seatText = this.seat
      ? this.seat.seatNumber
      : "Not selected";

    const assistanceText = this.aditionalAssistance
      ? this.aditionalAssistance
      : "None";

    card.innerHTML = `
      <div class="ticket-header">
        <h2>Ticket Summary</h2>
        <h3>$${this.ticketCost()}</h3>
      </div>

      <div class="ticket-route">

        <div>
          <h2>${this.flight.route.departureAirport.airportCode}</h2>
          <p>${this.flight.route.departureAirport.city}</p>
        </div>

        <div class="ticket-line">
          <span></span>
          <span class="ticket-plane">✈</span>
        </div>

        <div>
          <h2>${this.flight.route.arrivalAirport.airportCode}</h2>
          <p>${this.flight.route.arrivalAirport.city}</p>
        </div>

      </div>

      <div class="ticket-info">

        <div>
          <strong>Passenger</strong>
          <p>${this.passenger.firstName} ${this.passenger.lastName}</p>
        </div>

        <div>
          <strong>Flight Date</strong>
          <p>${this.flight.date}</p>
        </div>

        <div>
          <strong>Flight Time</strong>
          <p>${this.flight.time}</p>
        </div>

        <div>
          <strong>Seat</strong>
          <p>${seatText}</p>
        </div>

        <div>
          <strong>Luggage</strong>
          <p>${this.luggage}kg</p>
        </div>

        <div>
          <strong>Food</strong>
          <p>${foodText}</p>
        </div>

        <div>
          <strong>Drinks</strong>
          <p>${drinkText}</p>
        </div>

        <div>
          <strong>Additional Assistance</strong>
          <p>${assistanceText}</p>
        </div>

      </div>
    `;

    return card;
  }

}