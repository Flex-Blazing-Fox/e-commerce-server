require('dotenv').config()

const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

describe('POST /admin/login', () => {
  test('is successful', () => {
    request(app)
      .post('/admin/login')
      .send({
        email: 'admin@mail.com',
        password: process.env.PASSWORD_ADMIN,
      })
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('jwt', expect.any(String))
      })
  })

  describe('invalid email', () => {
    test('email is not valid', () => {
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
        })
    })

    test('email is empty', () => {
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
        })
    })
  })

  describe('invalid password', () => {
    test('password is not between 4 and 20 characters', () => {
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
        })
    })

    test('password is not between 4 and 20 characters', () => {
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
        })
    })
  })

})
