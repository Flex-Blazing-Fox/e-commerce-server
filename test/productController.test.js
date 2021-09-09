const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyNzkxMTk1N30.67iXmUlHyAxKjc2eH6B2awY1LTcBhKPpxHeUbELIZg0' 

beforeAll((done)=>{
    queryInterface.bulkDelete('Users', null, {})
        .then(()=>{
            const salt = bcrypt.genSaltSync(10);
            const testAdmin = {
                email: 'testAdmin@mail.com',
                password: bcrypt.hashSync('12345', salt),
                role: 'Admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            return queryInterface.bulkInsert("Users", [testAdmin]);
        })
    .then(()=>{
        const token = JWT.sign({
            email: 'testAdmin@mail.com'
        }, "romanova" )
        
        access_token = token
        done()
    })
})

afterAll((done)=>{
    queryInterface.bulkDelete('Users', null, {})
    done()
})

describe('GET /admin/product', ()=>{
    test('Show all product', (done)=>{
        request(app)
            .get('/admin/product')
            .then(response=>{
                expect(response.statusCode).toBe(200)
                done()
            })
    })
    test('Show product by id', (done)=>{
        request(app)
            .get('/admin/product/1')
            .then(response=>{
                expect(response.statusCode).toBe(200)
                done()
            })
    })
})