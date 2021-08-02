const request = require('supertest')
const app = require('../app')

describe('POST /admin/register', ()=>{
    test('Success register', (done)=>{
        request(app)
            .post('/admin/register')
            .then(response=>{
                expect(response.statusCode).tobe(201)
                done()
            })
    })
})