const mongoose = require('mongoose');
Booking = require("../models/bookingModel.js")(mongoose);

function getBooking(id, callback){
    Booking.findById(id, callback);
}

exports.getAllBookings = function(req, res) {
    Booking.find({}, function(err, movie) {
        if (err)
            res.send(err);
        res.json(movie);
    });
};

exports.getBookingByID = function(req, res) {
    getBooking(req.params.id, function(err, movie) {
        if (err)
            res.send(err);
        else{
            if(movie==null){
                res.status(404).send({
                    description: 'Booking not found'
                });
            }
            else{
                res.json(movie);
            }
        }
    });
};

exports.createBooking = function(req, res) {
    var booking = new Booking(req.body);
    booking.save(function(err, b) {
        if (err)
            res.send(err);
        res.status(201).json(b);
    });
};

exports.updateBooking = function(req, res) {
    Booking.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, movie) {
        if (err)
            res.send(err);
        else{
            if(movie==null){
                res.status(404).send({
                    description: 'Booking not found'
                });
            }
            else{
                res.json(movie);
            }
        }
    });
};

exports.deleteBooking = function(req, res) {
    getBooking(req.params.id, (err, b) => {
        if(!err && b != null && b.status === 'PENDING'){
            Booking.deleteOne({_id: req.params.id}, function(err, result) {
                if (err)
                    res.send(err);
                else{
                    if(result.deletedCount===0){
                        res.status(404).send({
                            description: 'Booking not found'
                        });
                    }
                    else{
                        res.json({ message: 'Task successfully deleted' });
                    }
                }
            });
        }
    });
};
