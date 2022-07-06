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

function doGetAllRequest(baseurl, callback){
	chai.request(server)
		.get(baseurl)
		.end((err, res) => {
			verifyResAndErr(err, res, "array");
			callback(res);
		});
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

function verifyResAndErr(err, res, type, statusCode = 200){
	chai.assert(err == null);
	res.should.have.status(statusCode);
	res.body.should.be.a(type);
}

function verifyErrorMessage(err, res){
	verifyResAndErr(err, res, "object", 404);
	res.body.should.have.property("_message").eql("Booking not found");
}

chai.use(chaiHttp);
//Our parent block
describe("Bookings Test", () => {
	const baseurl = "/bookings";
	before("remove elements from test collection", (done) => {
		Booking.deleteMany({}, () => done());
	});

	after("close connection" ,(done) => {
		mongoose.connection.close();
		done();
	});

	describe("POST on /bookings", () => {
		it("it should create a new booking", (done) => {
			doPostRequest(baseurl, createNewBooking(), (err, res) => {
				verifyResAndErr(err, res, "object");
				verifyBookingObject(res.body);
				done();
			});
		});

		it("it should not create a new booking if the type of waste is incorrect ", (done) => {
			doPostRequest(baseurl, createNewBooking(DEFAULT_USER_ID, "plastic"),
				(err, res) => verifyValidationError(err, res, done));
		});

		it("it should not create a new booking if the status is incorrect ", (done) => {
			doPostRequest(baseurl, createNewBooking(DEFAULT_USER_ID, DEFAULT_WASTE, "pending"),
				(err, res) => verifyValidationError(err, res, done));
		});

		it("it should not create a new booking if the user_id is missing ", (done) => {
			doPostRequest(baseurl, createNewBooking(""),
				(err, res) => verifyValidationError(err, res, done));
		});

	});

	describe("GET on /bookings", () => {
		it("it should GET all the bookings in the collection", (done) => {
			doGetAllRequest(baseurl, (res) => {
				res.body.length.should.be.eql(1);
				res.body[0].should.be.a("object");
				verifyBookingObject(res.body[0]);
				done();
			});
		});
	});

	describe("GET on /bookings/:id", () => {
		it("it should GET the booking with the specified id", (done) => {
			doPostRequest(baseurl, createNewBooking("3"), (err, res) => {
				verifyResAndErr(err, res, "object");
				const booking_id = res.body["_id"];
				chai.request(server)
					.get(baseurl+"/"+booking_id)
					.end((err, res) => {
						verifyResAndErr(err, res, "object");
						verifyBookingObject(res.body, "3");
						done();
					});
			});
		});

		it("it should return an error if the specified booking doesn't exist", (done) => {
			chai.request(server)
				.get(baseurl+"/"+"000000000000000000000000")
				.end((err, res) => {
					verifyErrorMessage(err, res);
					done();
				});
		});
	});

	describe("PUT on /bookings/:id", () => {
		it("it should update the booking with the specified id", (done) => {
			doPostRequest(baseurl, createNewBooking("2"), (err, res) => {
				verifyResAndErr(err, res, "object");
				const booking_id = res.body["_id"];
				chai.request(server)
					.put(baseurl+"/"+booking_id)
					.send(createNewBooking("2", "WASTE OIL"))
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a("object");
						verifyBookingObject(res.body, "2", "WASTE OIL");
						done();
					});
			});
		});
		it("it should not update the specified booking if it doesn't exist", (done) => {
			chai.request(server)
				.put(baseurl+"/"+"000000000000000000000000")
				.send(createNewBooking())
				.end((err, res) => {
					verifyErrorMessage(err, res);
					done();
				});
		});
	});

	describe("DELETE on /bookings/:id", () => {
		it("it should remove the booking with the specified id", (done) => {
			doPostRequest(baseurl, createNewBooking("2"), (err, res) => {
				verifyResAndErr(err, res, "object");
				const booking_id = res.body["_id"];
				chai.request(server)
					.delete(baseurl+"/"+booking_id)
					.end((err, res) => {
						verifyResAndErr(err, res, "object");
						res.body.should.have.property("_message").eql("Task successfully deleted");
						doGetAllRequest(baseurl,(res) => res.body
							.forEach((obj) => chai.assert(obj["_id"] !== booking_id)));
						done();
					});
			});
		});
		it("it should not remove the specified booking if it doesn't exist", (done) => {
			chai.request(server)
				.put(baseurl+"/"+"000000000000000000000000")
				.end((err, res) => {
					verifyErrorMessage(err, res);
					done();
				});
		});
	});


});
