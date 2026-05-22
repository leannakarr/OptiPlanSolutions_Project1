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
}