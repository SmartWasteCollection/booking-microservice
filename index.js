const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');

global.appRoot = path.resolve(__dirname);

const PORT = 3000;

app.use(cors())
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost:27017/swc-bookings',
    {useNewUrlParser: true, useUnifiedTopology: true},
    (e) => {
        e == null ? console.log("Connected to mongoDB") : e();
});

const routes = require('./src/routes/bookingRoutes');
routes(app)

app.get("/", (req, res) => {
    res.status(200).send("Hello!")
});

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})

});

app.listen(PORT, function () {
    console.log('Node API server started on port '+PORT);
});
