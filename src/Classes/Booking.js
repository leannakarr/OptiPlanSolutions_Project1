export default class Booking {
  static bookingList = [];
  static tax = 0.14;

  constructor(flight, user = null, tickets = []) {
    this.bookingId = `BK_${Date.now()}`;
    this.flight = flight;
    this.user = user;
    this.tickets = tickets;
    this.status = "Pending Payment";

    Booking.bookingList.push(this);
  }

  bookingCost() {
    let total = 0;

    for (let t of this.tickets) {
      total += t.ticketCost();
    }

    total += Booking.tax*total;

    return total;
  }

  confirmBooking() {
    this.status = "Confirmed";
  }

  cancelBooking() {
    this.status = "Cancelled";

    for (let t of this.tickets) {
      if (t.seat) {
        t.seat.isBooked = false;
      }
    }
  }

  static findBooking(bookingId) {
    return Booking.bookingList.find(
      booking => booking.bookingId === bookingId
    );
  }

  static toJSON(booking) {

    return {
        bookingId: booking.bookingId,
        status: booking.status,

        flight: {
            id: booking.flight.id,
            date: booking.flight.date,
            time: booking.flight.time,
            price: booking.flight.price,

            departureCode:
                booking.flight.route.departureAirport.airportCode,

            departureCity:
                booking.flight.route.departureAirport.city,

            arrivalCode:
                booking.flight.route.arrivalAirport.airportCode,

            arrivalCity:
                booking.flight.route.arrivalAirport.city
        },

        tickets: booking.tickets.map(ticket => ({

            passenger: {
                firstName: ticket.passenger.firstName,
                lastName: ticket.passenger.lastName,
                email: ticket.passenger.email
            },

            seat: ticket.seat
                ? ticket.seat.seatNumber || ticket.seat.value || "Selected"
                : null,

            luggage: ticket.luggage,

            foodItems: ticket.foodItems,

            drinkItems: ticket.drinkItems,

            aditionalAssistance:
                ticket.aditionalAssistance,

            cost: ticket.ticketCost()

        })),

        totalCost: booking.bookingCost()
    };
}
}