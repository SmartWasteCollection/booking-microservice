module.exports = (io) => {

	const notify = (res) => {
		console.log(res);
		io.to(res.userId).emit("assigned", res);
	};
	return {
		notify
	};
};
