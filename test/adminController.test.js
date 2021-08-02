const request = require('supertest')
const app = require('../app')

beforeAll((done)=>{
    queryInterface.bulkDelete('Users', null, {})
    done()
})

afterAll((done)=>{
    queryInterface.bulkDelete('Users', null, {})
    done()
})

describe('POST /admin/login', ()=>{
    test('Success register', (done)=>{
        request(app)
            .post('/admin/register')
            .send({
                email: 'admin4@mail.com',
                password: '1234'
            })
            .then(response=>{
                expect(response.statusCode).toBe(201)
                done()
            })
    }),
    test('Email already registered', (done)=>{
        request(app)
            .post('/admin/register')
            .send({
                email: 'admin@mail.com',
                password: '1234'
            })
            .then(response=>{
                expect(response.statusCode).toBe(400)
                done()
            })
    }),
    test('Invalid email/password', (done)=>{
        request(app)
            .post('/admin/login')
            .send({
                email: 'admin@mail.com',
                password: '123456'
            })
            .then(response=>{
                expect(response.statusCode).toBe(401)
                done()
            })
    })
})