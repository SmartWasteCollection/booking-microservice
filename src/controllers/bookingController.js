Booking = require("../models/bookingModel.js");

function getBooking (id, callback){
	Booking.findById(id, callback);
}

function queryCallbackWithError (res, err, booking, notFoundCond){
	if (err)
		res.send(err);
	else {
		if (notFoundCond)
			res.status(404).send({ _message: "Booking not found" });
		else
			res.json(booking);
	}
}

function queryCallback (res, err, booking) {
	queryCallbackWithError(res, err, booking, false);
}

exports.getAllBookings = (req, res) => Booking.find({}, (err, b) => queryCallback(res, err, b));

exports.getBookingByID = (req, res) => getBooking(req.params.id,
	(err, b) => queryCallbackWithError(res, err, b, b == null));

exports.createBooking = (req, res) => new Booking(req.body)
	.save((err, b) => queryCallback(res, err, b));

exports.updateBooking = (req, res) => Booking.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},
	(err, b) => queryCallbackWithError(res, err, b, b == null));

exports.deleteBooking = (req, res) => {
	getBooking(req.params.id, (err, b) => {
		if (!err && b != null && b.status === "PENDING")
			Booking.deleteOne({_id: req.params.id},
				(err, result) => queryCallbackWithError(res, err,
					{ _message: "Task successfully deleted" }, result.deletedCount===0));
	});
};
