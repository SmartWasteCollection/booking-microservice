module.exports = function(mongoose, AutoIncrement) {
	const Schema = mongoose.Schema;
	const BookingSchema = new Schema({
		id_booking:  {
			type: Number,
			unique: true
		},
		id_user: String,
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
	BookingSchema.plugin(AutoIncrement, {id:"id_booking_seq",inc_field: "id_booking"});
	return mongoose.model("Booking", BookingSchema);
};
