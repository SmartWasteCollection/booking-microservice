const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

global.appRoot = path.resolve(__dirname);

const PORT = process.env.SERVER_PORT | 3000;

app.use(cors());
app.use(express.json());
app.use("/static", express.static(__dirname + "/public"));

mongoose.connect(process.env.URI_MONGO_DB,
	{useNewUrlParser: true, useUnifiedTopology: true},
	(e) => e == null ? console.log("Connected to mongoDB") : console.log("ERROR on connection: " + e));

const routes = require("./src/routes/bookingRoutes");
routes(app);

app.get("/", (req, res) => {
	res.status(200).send("Hello!");
});

app.use((req, res) => res.status(404).send({url: req.originalUrl + " not found"}));

app.listen(PORT, () => console.log("Node API server started on port "+PORT));

module.exports = app;
