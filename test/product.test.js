const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

beforeAll(async () => {
  await queryInterface.bulkInsert('Products', [{
    id: 1,
    name: 'sling bag merah',
    image_url:
      'https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50',
    price: 10000,
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  }])
  await queryInterface.bulkInsert('Types', [{
    id: 1,
    name: 'sling bag',
    createdAt: new Date(),
    updatedAt: new Date()
  }])
  await queryInterface.bulkInsert('Product_Types', [{
    product_id: 1,
    type_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }])
})

afterAll(async () => {
  await queryInterface.bulkDelete('Products', null, {})
  await queryInterface.bulkDelete('Types', null, {})
  await queryInterface.bulkDelete('Product_Types', null, {})
})

const access_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyNzU4MjgzM30.TTxLy8IJqm8AiO8lpBIcwC12tIJ5zBFOVd4t4u_ggsM'

describe('Get list of products', () => {
  test('is successful', (done) => {
    request(app)
      .get('/products')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('products', expect.any(Array))
        done()
      })
  })
})

describe('Get a product based on id', () => {
  test('is successful', (done) => {
    request(app)
      .get('/products/1')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body.product).toHaveProperty('name')
        expect(response.body.product).toHaveProperty('image_url')
        expect(response.body.product).toHaveProperty('price')
        expect(response.body.product).toHaveProperty('stock')
        done()
      })
  })

  test('is not found', (done) => {
    request(app)
      .get('/products/100')
      .then((response) => {
        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body.errors[0]).toHaveProperty(
          'title',
          expect.any(String)
        )
        expect(response.body.errors[0]).toHaveProperty(
          'detail',
          expect.any(String)
        )
        done()
      })
  })
})

describe('Update a product based on id', () => {
  test('is successful', (done) => {
    request(app)
      .put('/products/1')
      .set('access_token', access_token)
      .send({
        name: 'sling bag hijau',
        image_url:
          'https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50',
        price: 20000,
        stock: 10,
        type_name: 'sling bag',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body.product).toHaveProperty('name')
        expect(response.body.product).toHaveProperty('image_url')
        expect(response.body.product).toHaveProperty('price')
        expect(response.body.product).toHaveProperty('stock')
        done()
      })
  })

  test('is not authorized', (done) => {
    request(app)
      .put('/products/1')
      .then((response) => {
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body.errors[0]).toHaveProperty(
          'title',
          expect.any(String)
        )
        expect(response.body.errors[0]).toHaveProperty('detail', expect.any(String))
        done()
      })
  })
})

describe('Delete a product based on id', () => {
  test('is successful', (done) => {
    request(app)
      .delete('/products/1')
      .set('access_token', access_token)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('message', expect.any(String))
        done()
      })
  })

  test('is not found', (done) => {
    request(app)
      .delete('/products/100')
      .set('access_token', access_token)
      .then((response) => {
        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body.errors[0]).toHaveProperty(
          'title',
          expect.any(String)
        )
        expect(response.body.errors[0]).toHaveProperty(
          'detail',
          expect.any(String)
        )
        done()
      })
  })

  test('is not authorized', (done) => {
    request(app)
      .delete('/products/1')
      .then((response) => {
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body.errors[0]).toHaveProperty(
          'title',
          expect.any(String)
        )
        expect(response.body.errors[0]).toHaveProperty('detail', expect.any(String))
        done()
      })
  })
})

describe('Add a new product', () => {
  test('is successful', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'sling bag biru',
        image_url:
          'https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50',
        price: 10000,
        stock: 10,
        type_name: 'sling bag',
      })
      .then((response) => {
        expect(response.statusCode).toBe(201)
        expect(response.body.product).toHaveProperty('name')
        expect(response.body.product).toHaveProperty('image_url')
        expect(response.body.product).toHaveProperty('price')
        expect(response.body.product).toHaveProperty('stock')
        done()
      })
  })

  test('stock is not greater than 0', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'sling bag biru',
        image_url:
          'https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50',
        price: 10000,
        stock: -1,
        type_name: 'sling bag',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body.errors[0]).toHaveProperty(
          'title',
          expect.any(String)
        )
        expect(response.body.errors[0]).toHaveProperty(
          'detail',
          'stock must be greater than or equal to 0'
        )
        done()
      })
  })

  test('price is not greater than 0', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'sling bag hijau',
        image_url:
          'https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50',
        price: -10000,
        stock: 10,
        type_name: 'sling bag',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body.errors[0]).toHaveProperty(
          'title',
          expect.any(String)
        )
        expect(response.body.errors[0]).toHaveProperty(
          'detail',
          'price must be greater than or equal to 0'
        )
        done()
      })
  })

  test('is not authorized', (done) => {
    request(app)
      .post('/products')
      .send({
        name: 'sling bag hijau',
        image_url:
          'https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50',
        price: 10000,
        stock: 10,
        type_name: 'sling bag',
      })
      .then((response) => {
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body.errors[0]).toHaveProperty(
          'title',
          expect.any(String)
        )
        expect(response.body.errors[0]).toHaveProperty('detail', expect.any(String))
        done()
      })
  })
})
