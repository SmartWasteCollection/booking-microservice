const Notification = require("../models/NotificationModel.js");
class NotificationStore {
	constructor () {
	}

	notifyUser (uid, send) {
		Notification.find({userId:uid}).populate("booking").exec((err, notifications) => {
			console.log(notifications.length + " Notifications for user: " + uid);
			notifications.forEach(n =>{
				send(n);
			});
		});
		// Notification.deleteMany({userId:uid}, (err) => {
		// 	if (err) throw new Error("An error occurs trying to delete notifications. " + err);
		// });
	}

	deleteNotification (id){
		Notification.findByIdAndRemove(id, (err, res) => {
			if (err) throw new Error("An error occurs trying to remove a notification. " + err);
			else console.log("Notification removed successfully " + res);
		});
	}

	markAsRead (id, n){
		Notification.findByIdAndUpdate(id, n, {new: true}, (err, res) =>{
			if (err) throw new Error("An error occurs trying to mark as read a notification. " + err);
			else console.log("Notification" +  id +"mark as read successfully " + res);
		});
	}

	populateBooking (n){
		return Notification.populate(n, {path:"booking"});
	}

	saveNotification (userId, booking) {
		return new Notification({
			userId,
			booking
		}).save();
	}

}

module.exports = new NotificationStore();
