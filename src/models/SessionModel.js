const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SessionSchema = new Schema({
	userId: {
		type: String,
		required: true
	},
	sessionId: {
		type: String,
		required: true
	}
});
module.exports = mongoose.model("Session", SessionSchema);
