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

  describe('invalid email', () => {
    test('email is not valid', (done) => {
      request(app)
        .post('/admin/login')
        .send({
          email: 'admin',
          password: process.env.PASSWORD_ADMIN,
        })
        .then(response => {
          expect(response.statusCode).toBe(400)
          expect(response.body).toHaveProperty('errors', expect.any(Array))
          expect(response.body).toHaveProperty('errors.status', 400)
          expect(response.body).toHaveProperty('errors.title',expect.any(String))
          expect(response.body).toHaveProperty('errors.detail', 'invalid email address')
          done()
        })
    })

    test('email is empty', (done) => {
      request(app)
        .post('/admin/login')
        .send({
          email: '',
          password: process.env.PASSWORD_ADMIN,
        })
        .then(response => {
          expect(response.statusCode).toBe(400)
          expect(response.body).toHaveProperty('errors', expect.any(Array))
          expect(response.body).toHaveProperty('errors.status', 400)
          expect(response.body).toHaveProperty('errors.title',expect.any(String))
          expect(response.body).toHaveProperty('errors.detail', 'email must not be empty')
          done()
        })
    })
  })

  describe('invalid password', () => {
    test('password is not between 4 and 20 characters', (done) => {
      request(app)
        .post('/admin/login')
        .send({
          email: 'admin@mail.com',
          password: '123',
        })
        .then(response => {
          expect(response.statusCode).toBe(400)
          expect(response.body).toHaveProperty('errors', expect.any(Array))
          expect(response.body).toHaveProperty('errors.status', 400)
          expect(response.body).toHaveProperty('errors.title',expect.any(String))
          expect(response.body).toHaveProperty('errors.detail', 'password must be between 4 and 20 characters')
          done()
        })
    })

    test('password is not between 4 and 20 characters', (done) => {
      request(app)
        .post('/admin/login')
        .send({
          email: 'admin@mail.com',
          password: '',
        })
        .then(response => {
          expect(response.statusCode).toBe(400)
          expect(response.body).toHaveProperty('errors', expect.any(Array))
          expect(response.body).toHaveProperty('errors.status', 400)
          expect(response.body).toHaveProperty('errors.title',expect.any(String))
          expect(response.body).toHaveProperty('errors.detail', 'password must not be empty')
          done()
        })
    })
  })

})
