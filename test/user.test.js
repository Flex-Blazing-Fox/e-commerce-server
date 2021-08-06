const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const {queryInterface} = sequelize;

beforeAll((done) => {
	queryInterface.bulkDelete("Users", null, {})
	.then(() => done())
});
  
afterAll((done) => {
	queryInterface.bulkDelete("Users", null, {})
	.then(() => done())
});

describe("POST /register", () => {
	test("success register", (done) => {
		request(app)
			.post("/register")
			.set('Content-Type', 'application/json')
			.send({
				email: "user@gmail.com",
				password: "123456",
				role: "customer"
			})
			.then((response) => {
				expect(response.statusCode).toBe(201)
				done();
			})
			.catch((err)=>{
				next(err);
			})
	});
});

describe("POST /login", () => {
	test("success login", (done) => {
		request(app)
			.post("/login")
			.send({
				email: "user@gmail.com",
				password: "123456"
			})
            .then((response)=>{
                expect(response.statusCode).toBe(200)
				done()
            })
			.catch((err)=>{
				next(err);
			})
	});
});