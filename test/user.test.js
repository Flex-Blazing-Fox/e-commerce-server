const app = require('../index')
const request = require('supertest')

describe("POST /users/login", () => {
    test("Login Success", (done) => {
        request(app)
            .post("/users/login")
            .send({
                email:"admin@mail.com",
                password: "123456"
            })
            .end((response) => {
                expect(response.statusCode).toBe(200)
            })
            done()
    })
});