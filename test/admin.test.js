const app = require('../app')
const request = require('supertest')

describe('POST /admin/login', () => {
  test('is successful', (done) => {
    request(app)
      .post('/admin/login')
      .send({
        email: 'admin@mail.com',
        password: 'adfkjkad1238',
      })
      .end((err, res) => {
        if (err) return done(err)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('jwt', expect.any(String))
        done()
      })
  })

  test('email is wrong', (done) => {
    request(app)
      .post('/admin/login')
      .send({
        email: 'admins@mail.com',
        password: 'adfkjkad1238',
      })
      .end((err, res) => {
        if (err) return done(err)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors[0]).toHaveProperty('status', 400)
        expect(res.body.errors[0]).toHaveProperty(
          'title',
          expect.any(String)
        )
        expect(res.body.errors[0]).toHaveProperty(
          'detail',
          'Email or password is wrong'
        )
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
      .end((err, res) => {
        if (err) return done(err)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors[0]).toHaveProperty('status', 400)
        expect(res.body.errors[0]).toHaveProperty(
          'title',
          expect.any(String)
        )
        expect(res.body.errors[0]).toHaveProperty(
          'detail',
          'Email or password is wrong'
        )
        done()
      })
  })
})
