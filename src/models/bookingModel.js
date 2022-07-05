module.exports = function(mongoose) {
	const Schema = mongoose.Schema;
	const BookingSchema = new Schema({
		id_booking:  String,
		id_user: String,
		type_of_waste: {
			type: String,
			enum: ["TWIGS", "WASTE OIL", "IRON", "ELECTRONICS", "CLOTHES", "OTHER"]
		},
		datetime: Date,
		city: String,
		province: String,
		address: String,
		status: {
			type: String,
			enum: ["PENDING", "ASSIGNED", "COMPLETED"],
			default: "PENDING"
		},
	});
	return mongoose.model("Booking", BookingSchema);
};
