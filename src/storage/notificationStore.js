const Notification = require("../models/NotificationModel.js");
class NotificationStore {
	constructor () {
	}

	notifyUser (uid, notify) {
		Notification.find({userId:uid}).populate("booking").exec((err, notifications) => {
			notifications.forEach(n =>{
				notify(n.booking);
			});
		});
		Notification.deleteMany({userId:uid}, (err) => {
			if (err) throw new Error("An error occurs trying to delete notifications. " + err);
		});
	}


	saveNotification (userId, booking) {
		new Notification({
			userId,
			booking
		}).save((err, n) => {
			if (err) throw new Error("An error occurs trying to save notification. " + err);
			if (n != null) console.log("Notification saved successfully");
		});
	}

}

module.exports = new NotificationStore();
