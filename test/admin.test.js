require('dotenv').config()

const app = require('../app')
const request = require('supertest')

describe('POST /admin/login', () => {
  test('is successful', (done) => {
    request(app)
      .post('/admin/login')
      .send({
        email: 'admin@mail.com',
        password: process.env.PASSWORD_ADMIN,
      })
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('jwt', expect.any(String))
        done()
      })
  })

  test('email is wrong', (done) => {
    request(app)
      .post('/admin/login')
      .send({
        email: 'admins@mail.com',
        password: process.env.PASSWORD_ADMIN,
      })
      .then(response => {
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body).toHaveProperty('errors[0].status', 400)
        expect(response.body).toHaveProperty('errors[0].title',expect.any(String))
        expect(response.body).toHaveProperty('errors[0].detail', 'Email or password is wrong')
        done()
      })
  })

  test('password is wrong', (done) => {
    request(app)
      .post('/admin/login')
      .send({
        email: 'admin@mail.com',
        password: '123',
      })
      .then(response => {
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body).toHaveProperty('errors[0].status', 400)
        expect(response.body).toHaveProperty('errors[0].title',expect.any(String))
        expect(response.body).toHaveProperty('errors[0].detail', 'Email or password is wrong')
        done()
      })
  })
})
