const app = require('../index')
const request = require('supertest')

beforeAll((done)=>{
  queryInterface.bulkDelete('Users', null, {})
  done()
})

afterAll((done)=>{
  queryInterface.bulkDelete('Users', null, {})
  done()
})

describe("POST /users/login", () => {
    test("Login Success", (done) => {
      request(app)
        .post("/users/login")
        .send({
          email: "admin@mail.com",
          password: "123456",
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        });
    }),
    test('Email or Password Invalid', (done)=>{
      request(app)
          .post('/admin/login')
          .send({
              email: 'admin@mailer.com',
              password: '123456'
          })
          .then(response=>{
              expect(response.statusCode).toBe(401)
              done()
          })
    })
});