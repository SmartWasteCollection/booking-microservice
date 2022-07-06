const mongoose = require("mongoose");
let Booking = require("../src/models/bookingModel");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index.js");
// eslint-disable-next-line no-unused-vars
let should = chai.should();

const DEFAULT_USER_ID = "1";
const DEFAULT_WASTE = "TWIGS";
const DEFAULT_CITY = "Cesena";
const DEFAULT_ADDRESS = "Via dell'Università,50";
const DEFAULT_PROVINCE = "FC";
const DEFAULT_STATUS = "PENDING";


function createNewBooking(id_user = DEFAULT_USER_ID, type_of_waste = DEFAULT_WASTE, status = DEFAULT_STATUS,
	city = DEFAULT_CITY, province = DEFAULT_PROVINCE, address= DEFAULT_ADDRESS){
	return {
		id_user : id_user,
		type_of_waste : type_of_waste,
		city : city,
		province : province,
		address : address,
		status : status
	};
}

function doPostRequest(url, body, callback){
	chai.request(server)
		.post(url)
		.send(body)
		.end(callback);
}

function verifyBookingObject(obj, id_user = DEFAULT_USER_ID, type_of_waste = DEFAULT_WASTE, status = DEFAULT_STATUS,
	city = DEFAULT_CITY, province = DEFAULT_PROVINCE, address= DEFAULT_ADDRESS) {
	obj.should.have.property("id_user").eql(id_user);
	obj.should.have.property("type_of_waste").eql(type_of_waste);
	obj.should.have.property("city").eql(city);
	obj.should.have.property("province").eql(province);
	obj.should.have.property("address").eql(address);
	obj.should.have.property("datetime");
	obj.should.have.property("status").eql(status);
}

function verifyValidationError(err, res, done){
	chai.assert(err == null);
	res.should.have.status(200);
	res.body.should.be.a("object");
	res.body.should.have.property("_message").eql("Booking validation failed");
	done();
}

chai.use(chaiHttp);
//Our parent block
describe("Bookings Test", () => {

	before("remove elements from test collection", (done) => {
		Booking.deleteMany({}, () => done());
	});

	after("close connecion" ,(done) => {
		mongoose.connection.close();
		done();
	});

	describe("POST on /bookings", () => {
		const url = "/bookings";
		it("it should create a new booking", (done) => {
			doPostRequest(url, createNewBooking(), (err, res) => {
				chai.assert(err == null);
				res.should.have.status(200);
				res.body.should.be.a("object");
				verifyBookingObject(res.body);
				done();
			});
		});

		it("it should not create a new booking if the type of waste is incorrect ", (done) => {
			doPostRequest(url, createNewBooking(DEFAULT_USER_ID, "plastic"),
				(err, res) => verifyValidationError(err, res, done));
		});

		it("it should not create a new booking if the status is incorrect ", (done) => {
			doPostRequest(url, createNewBooking(DEFAULT_USER_ID, DEFAULT_WASTE, "pending"),
				(err, res) => verifyValidationError(err, res, done));
		});

		it("it should not create a new booking if the user_id is missing ", (done) => {
			doPostRequest(url, createNewBooking(""),
				(err, res) => verifyValidationError(err, res, done));
		});

	});

	describe("GET on /bookings", () => {
		it("it should GET all the bookings in the collection", (done) => {
			chai.request(server)
				.get("/bookings")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("array");
					res.body.length.should.be.eql(1);
					res.body[0].should.be.a("object");
					verifyBookingObject(res.body[0]);
					done();
				});
		});
	});

});
