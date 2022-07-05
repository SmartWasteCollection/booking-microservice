var express = require('express');
var app = express();
var cors = require('cors')
var path = require('path');

global.appRoot = path.resolve(__dirname);

var PORT = 3000;

app.use(cors())
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));


app.get("/", (req, res) => {
    res.status(200).send("Hello!")
});

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})

});

app.listen(PORT, function () {
    console.log('Node API server started on port '+PORT);
});
