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
}