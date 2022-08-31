module.exports = function (app, bookingController) {
	app.route("/bookings")
		.get(bookingController.getAllBookings)
		.post(bookingController.createBooking);

	app.route("/bookings/:id")
		.get(bookingController.getBookingByID)
		.put(bookingController.updateBooking)
		.delete(bookingController.deleteBooking);

	app.route("/bookings/user/:userId")
		.get(bookingController.getBookingsByUser);
};
