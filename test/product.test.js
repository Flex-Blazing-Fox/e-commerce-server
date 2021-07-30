const app = require('../index')
const request = require('supertest')

describe("GET /products", () => {
    test("Get All Product", (done) => {
        request(app)
            .get("/products")
            .set('Accept', 'application/json')
            .then((response) => {
                expect(response.statusCode).toBe(200)
                expect(response.body.product).toHaveProperty('name')
            })
            done()
    })
});