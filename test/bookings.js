const mongoose = require("mongoose");
let Booking = require("../src/models/bookingModel");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index.js");
// eslint-disable-next-line no-unused-vars
let should = chai.should();

function createNewBooking(user_id, type_of_waste, status="PENDING",
	city="Cesena", province="FC", address="Via dell'Università,50"){
	return {
		id_user : user_id,
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
			doPostRequest(url, createNewBooking("1", "TWIGS"), (err, res) => {
				chai.assert(err == null);
				res.should.have.status(200);
				res.body.should.be.a("object");
				res.body.should.have.property("id_user").eql("1");
				res.body.should.have.property("type_of_waste").eql("TWIGS");
				res.body.should.have.property("city").eql("Cesena");
				res.body.should.have.property("province").eql("FC");
				res.body.should.have.property("address").eql("Via dell'Università,50");
				res.body.should.have.property("datetime");
				res.body.should.have.property("status").eql("PENDING");
				done();
			});
		});

		it("it should not create a new booking if the type of waste is incorrect ", (done) => {
			doPostRequest(url, createNewBooking("1", "plastic"),(err, res) => {
				chai.assert(err == null);
				res.should.have.status(200);
				res.body.should.be.a("object");
				res.body.should.have.property("_message").eql("Booking validation failed");
				done();
			});
		});

		it("it should not create a new booking if the status is incorrect ", (done) => {
			doPostRequest(url, createNewBooking("1", "WASTE OIL", "pending"),(err, res) => {
				chai.assert(err == null);
				res.should.have.status(200);
				res.body.should.be.a("object");
				res.body.should.have.property("_message").eql("Booking validation failed");
				done();
			});
		});

		it("it should not create a new booking if the user_id is missing ", (done) => {
			doPostRequest(url, createNewBooking("", "WASTE OIL"),(err, res) => {
				chai.assert(err == null);
				res.should.have.status(200);
				res.body.should.be.a("object");
				res.body.should.have.property("_message").eql("Booking validation failed");
				done();
			});
		});

	});

	// describe("GET on /bookings", () => {
	// 	it("it should GET all the bookings in the collection", (done) => {
	// 		chai.request(server)
	// 			.get("/bookings")
	// 			.end((err, res) => {
	// 				res.should.have.status(200);
	// 				res.body.should.be.a("array");
	// 				res.body.length.should.be.eql(1);
	// 				done();
	// 			});
	// 	});
	// });

});
