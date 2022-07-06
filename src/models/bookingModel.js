module.exports = function(mongoose) {
	const Schema = mongoose.Schema;
	const BookingSchema = new Schema({
		id_user: {
			type: String,
			required: true
		},
		type_of_waste: {
			type: String,
			enum: ["TWIGS", "WASTE OIL", "IRON", "ELECTRONICS", "CLOTHES", "OTHER"]
		},
		datetime: {
			type: Date,
			default: Date.now
		},
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
