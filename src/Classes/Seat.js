export default class Seat {
  constructor(seatNumber, seatClass = "Economy") {
    this.seatNumber = seatNumber;
    this.seatClass = seatClass;
    this.isBooked = false;
  }

  bookSeat() {
    this.isBooked = true;
  }
}


