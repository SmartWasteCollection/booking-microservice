const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookingSchema = new Schema({
	userId: {
		type: String,
		required: true
	},
	typeOfWaste: {
		wasteName:{
			type: String,
			enum: ["TWIGS", "WASTE OIL", "IRON", "ELECTRONICS", "CLOTHES", "OTHER"]
		}
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
module.exports = mongoose.model("Booking", BookingSchema);
