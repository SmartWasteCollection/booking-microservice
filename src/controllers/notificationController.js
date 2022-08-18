module.exports = (io, notificationStore) => {

	const notify = async (res) => {
		const sockets = await io.in(res.userId).fetchSockets();
		if (sockets.length === 0) {
			notificationStore.saveNotification(res.userId, res._id);
		} else {
			io.to(res.userId).emit("assigned", res);
		}
	};
	return {
		notify
	};
};
