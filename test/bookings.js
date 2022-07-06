const mongoose = require("mongoose");
//const AutoIncrement = require("mongoose-sequence")(mongoose);
//let Booking = require("../src/models/bookingModel")(mongoose, AutoIncrement);

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index.js");
// eslint-disable-next-line no-unused-vars
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe("Bookings Test", () => {

	after("close connecion" ,() => {
		mongoose.connection.close();
	});
	/*
	  * Test the /GET route
	  */
	describe("GET on /bookings", () => {
		it("it should GET all the bookings in the collection", (done) => {
			chai.request(server)
				.get("/bookings")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("array");
					res.body.length.should.be.eql(3);
					done();
				});
		});
	});

});
