module.exports = (io, notificationStore) => {

	const notify = async (res) => {
		console.log("notify");
		let n = await notificationStore.saveNotification(res.userId, res._id);
		n = await notificationStore.populateBooking(n);
		console.log(n);
		const sockets = await io.in(n.userId).fetchSockets();
		console.log(sockets.length);
		if (sockets.length > 0) {
			console.log("notifica");
			io.to(n.booking.userId).emit("assigned", n);
		}
	};

	const send = async (n) => {
		const sockets = await io.in(n.booking.userId).fetchSockets();
		if (sockets.length > 0) {
			console.log("Invio notifica");
			io.to(n.booking.userId).emit("assigned", n);
		}
	};

	const deleteNotification = (id) => 	notificationStore.deleteNotification(id);

	const markAsRead = (id, n) => notificationStore.markAsRead(id, n);

	return {
		notify, send, deleteNotification, markAsRead
	};
};
