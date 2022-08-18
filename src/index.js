const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const randomId = require("random-id");
const sessionStore = require("./storage/sessionStore");
const notificationStore = require("./storage/notificationStore");
const bookingController = require("./controllers/bookingController");

require("dotenv").config();

global.appRoot = path.resolve(__dirname);

const PORT = process.env.SERVER_PORT | 3000;

app.use(cors());
app.use(express.json());
app.use("/static", express.static(__dirname + "/public"));

mongoose.connect(process.env.URI_MONGO_DB,
	{useNewUrlParser: true, useUnifiedTopology: true},
	(e) => e == null ? console.log("Connected to mongoDB") : console.log("ERROR on connection: " + e));

const routes = require("./routes/bookingRoutes");
routes(app, bookingController);

app.get("/", (req, res) => {
	res.status(200).send("Hello!");
});

app.use((req, res) => res.status(404).send({url: req.originalUrl + " not found"}));

const httpServer = createServer(app);
httpServer.listen(PORT, () => console.log("Node API server started on port "+PORT) );

const io = new Server(httpServer,  {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}});

const {notify} = require("./controllers/notificationController")(io, notificationStore);

bookingController.addObserver(notify);
io.use((socket, next) => {
	const sessionId = socket.handshake.auth.sessionId;
	if (sessionId) {
		const session = sessionStore.findSession(sessionId);
		if (session) {
			socket.sessionId = sessionId;
			socket.userId = session.userId;
			return next();
		}
	}
	const userId = socket.handshake.auth.userId._value;
	if (!userId) {
		return next(new Error("invalid userId"));
	}
	// create new session
	socket.sessionId = randomId();
	socket.userId = userId;
	next();
});

io.on("connection", (socket) => {
	console.log("Socket connected", socket.userId);
	socket.emit("session", {
		sessionId: socket.sessionId,
		userId: socket.userId
	});
	socket.join(socket.userId);
	notificationStore.notifyUser(socket.userId, notify);
	socket.on("disconnect", () => {
		sessionStore.saveSession(socket.sessionId, {
			sessionId: socket.sessionId,
			userId: socket.userId,
		});
	});
});

module.exports = app;
