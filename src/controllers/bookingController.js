const Booking = require("../models/bookingModel.js");
let observers = [];

function getBooking (id, callback){
	Booking.findById(id, callback);
}

function queryCallbackWithError (res, err, booking, notFoundCond){
	if (err)
		res.send(err);
	else {
		if (notFoundCond)
			res.status(404).send({ _message: "Booking not found" });
		else {
			res.json(booking);
		}
	}
}

function queryCallback (res, err, booking) {
	queryCallbackWithError(res, err, booking, false);
}

exports.addObserver = (o) => observers.push(o);

exports.getAllBookings = (req, res) => Booking.find({}, (err, b) => queryCallback(res, err, b));

exports.getBookingByID = (req, res) => getBooking(req.params.id,
	(err, b) => queryCallbackWithError(res, err, b, b == null));

exports.getBookingsByUser = (req, res) => Booking.find({userId:req.params.userId},
	(err, bookings) => queryCallbackWithError(res, err, bookings, bookings == null));

exports.createBooking = (req, res) => new Booking(req.body)
	.save((err, b) => queryCallback(res, err, b));

exports.updateBooking = (req, res) => Booking.findByIdAndUpdate(req.params.id, req.body, {new: true},
	(err, b) => {
		if (!err && b !== null){
			observers.forEach(o => o(b));
		}
		queryCallbackWithError(res, err, b, b == null);
	});

exports.deleteBooking = (req, res) => {
	getBooking(req.params.id, (err, b) => {
		if (!err && b != null && b.status === "PENDING")
			Booking.deleteOne({_id: req.params.id},
				(err, result) => queryCallbackWithError(res, err,
					{ _message: "Task successfully deleted" }, result.deletedCount===0));
	});
};
