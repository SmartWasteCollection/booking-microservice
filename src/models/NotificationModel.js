const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
	userId: {
		type: String,
		required: true
	},
	booking: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Booking",
		required: true
	},
	isRead: {
		type:Boolean,
		default:false
	}
});
module.exports = mongoose.model("Notification", NotificationSchema);
