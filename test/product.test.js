const app = require('../index')
const request = require('supertest')
const { sequelize } = require("../models");
const { queryInterface } = sequelize

describe("GET /products", () => {
    test("Get All Product", (done) => {
        request(app)
            .get("/products")
            .then((response) => {
                expect(response.statusCode).toBe(200)
                done()
            })  
    }),
    test('Get Product By Id', (done)=>{
        request(app)
            .get('/product/1')
            .then(response=>{
                expect(response.statusCode).toBe(200)
                done()
            })
    })
});