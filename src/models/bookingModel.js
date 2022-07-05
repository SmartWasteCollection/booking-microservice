module.exports = function(mongoose) {
    const Schema = mongoose.Schema;
    const BookingSchema = new Schema({
        id_booking:  String,
        id_user: String,
        type_of_waste: String,
        datetime: Date,
        city: String,
        province: String,
        address: String,
        status: String,
    });
    return mongoose.model('Booking', BookingSchema);
};
