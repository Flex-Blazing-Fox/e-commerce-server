const app = require('../app')
const request = require('supertest')

const access_token = ''

describe('Get list of products', () => {
  test('is successful', (done) => {
    request(app)
      .get('/products')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).any(Array)
        done()
      })
  })

  test('is not authorized', (done) => {
    request(app)
      .get('/products')
      .then((response) => {
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body).toHaveProperty('errors[0].title', expect.any(String))
        expect(response.body).toHaveProperty('errors[0].detail', 'unauthorized')
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
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('image_url')
        expect(response.body).toHaveProperty('price')
        expect(response.body).toHaveProperty('stock')
        done()
      })
  })

  test('is not found', (done) => {
    request(app)
      .get('/products/100')
      .then((response) => {
        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body).toHaveProperty('errors[0].title', expect.any(String))
        expect(response.body).toHaveProperty(
          'errors.detail',
          'product not found'
        )
      })
  })

  test('is not authorized', (done) => {
    request(app)
      .get('/products')
      .then((response) => {
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body).toHaveProperty('errors[0].title', expect.any(String))
        expect(response.body).toHaveProperty('errors[0].detail', 'unauthorized')
        done()
      })
  })
})

describe('Delete a product based on id', () => {
  test('is successful', (done) => {
    request(app)
      .delete('/products/1')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('message', 'product deleted')
        done()
      })
  })

  test('is not found', (done) => {
    request(app)
      .delete('/products/100')
      .then((response) => {
        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body).toHaveProperty('errors[0].title', expect.any(String))
        expect(response.body).toHaveProperty(
          'errors.detail',
          'product not found'
        )
      })
  })

  test('is not authorized', (done) => {
    request(app)
      .delete('/products/1')
      .then((response) => {
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body).toHaveProperty('errors[0].title', expect.any(String))
        expect(response.body).toHaveProperty('errors[0].detail', 'unauthorized')
        done()
      })
  })
})

describe('Update a product based on id', () => {
  test('is successful', (done) => {
    request(app)
      .put('/products/1')
      .send({
        name: 'sling bag hijau',
        image_url: 'https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50',
        price: 20000,
        stock: 10,
        type_name: 'sling bag'
      })
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('image_url')
        expect(response.body).toHaveProperty('price')
        expect(response.body).toHaveProperty('stock')
        done()
      })
  })

  test('is not found', (done) => {
    request(app)
      .put('/products/100')
      .then((response) => {
        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body).toHaveProperty('errors[0].title', expect.any(String))
        expect(response.body).toHaveProperty(
          'errors.detail',
          'product not found'
        )
      })
  })

  test('is not authorized', (done) => {
    request(app)
      .put('/products/1')
      .then((response) => {
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body).toHaveProperty('errors[0].title', expect.any(String))
        expect(response.body).toHaveProperty('errors[0].detail', 'unauthorized')
        done()
      })
  })
})

describe('Add a new product', () => {
  test('is successful', (done) => {
    request(app)
      .post('/products')
      .send({
        name: 'sling bag hijau',
        image_url: 'https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50',
        price: 10000,
        stock: 10,
        type_name: 'sling bag'
      })
      .then(response => {
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('image_url')
        expect(response.body).toHaveProperty('price')
        expect(response.body).toHaveProperty('stock')
        done()
      })
  })

  test('stock is not greater than 0', (done) => {
    request(app)
      .post('/products/1')
      .send({
        name: 'sling bag hijau',
        image_url: 'https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50',
        price: 10000,
        stock: -1,
        type_name: 'sling bag'
      })
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body).toHaveProperty('errors[0].title', expect.any(String))
        expect(response.body).toHaveProperty('errors[0].detail', 'stock must be greater or equal to 0')
        done()
      })
  })

  test('price is not greater than 0', (done) => {
    request(app)
      .post('/products/1')
      .send({
        name: 'sling bag hijau',
        image_url: 'https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50',
        price: -10000,
        stock: 10,
        type_name: 'sling bag'
      })
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body).toHaveProperty('errors[0].title', expect.any(String))
        expect(response.body).toHaveProperty('errors[0].detail', 'price must be greater or equal to 0')
        done()
      })
  })

  test('is not authorized', (done) => {
    request(app)
      .post('/products/1')
      .send({
        name: 'sling bag hijau',
        image_url: 'https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50',
        price: 10000,
        stock: 10,
        type_name: 'sling bag'
      })
      .then((response) => {
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('errors', expect.any(Array))
        expect(response.body).toHaveProperty('errors[0].title', expect.any(String))
        expect(response.body).toHaveProperty('errors[0].detail', 'unauthorized')
        done()
      })
  })
})
