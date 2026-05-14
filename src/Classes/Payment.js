export default class Payment {
  static paymentList = [];

  constructor(booking, method, cardNumber) {
    this.paymentId = `PAY_${Date.now()}`;
    this.booking = booking;
    this.method = method;
    this.cardNumber = cardNumber;
    this.status = "Pending";

    Payment.paymentList.push(this);
  }

  processPayment() {
    // simple validation
    if (this.cardNumber.length >= 12) {
      this.status = "Approved";

      // confirm booking automatically
      this.booking.confirmBooking();

      return true;
    } else {
      this.status = "Failed";
      return false;
    }
  }
}
