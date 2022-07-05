module.exports = function(app) {
    const bookingController = require('../controllers/bookingController');

    app.route('/bookings')
        .get(bookingController.getAllBookings)
        .post(bookingController.createBooking);

    app.route('/bookings/:id')
        .get(bookingController.getBookingByID)
        .put(bookingController.updateBooking)
        .delete(bookingController.deleteBooking);
};
