const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const jwt = require('jsonwebtoken');
const { JWT_KEY } = process.env;
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(8);
const admin = {
  id: 1,
  email: 'admin@mail.com',
  password: bcrypt.hashSync('123456', salt),
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date(),
};
const admin_access_token = jwt.sign({ id: 1, role: 'admin' }, JWT_KEY);

const newProduct = {
    id: 1,
    name: 'Sepatu',
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkCPgIUJaK0f3T604K3uqRJ6_Q_X3mYIhRGQ&usqp=CAU',
    price: 200000,
    stock: 50,
    category, 'Perabot',
    createdAt: new Date(),
    updatedAt: new Date(),
};

beforeAll((done) => {
  queryInterface
    .bulkDelete('Users', null, {})
    .then(() => {
      return queryInterface.bulkDelete('Products', null, {});
    })
    .then(() => {
      const users = [admin];
      return queryInterface.bulkInsert('Users', users);
    })
    .then(() => {
      const products = [newProduct];
      return queryInterface.bulkInsert('Products', products);
    })
    .then(() => done())
    .catch((err) => {
      throw err;
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete('Users', null, {})
    .then(() => {
      return queryInterface.bulkDelete('Products', null, {});
    })
    .then(() => done())
    .catch((err) => {
      throw err;
    });
});

describe('POST /products', () => {
  test('Success add', (done) => {
    request(app)
      .post('/product')
      .set({
        'Content-Type': 'application/json',
        access_token: admin_access_token,
      })
      .send(newProduct)
      .then(({ status, body }) => {
        expect(status).toBe(201);
        done();
      });
  });
});

describe('GET /products', () => {
    test('Success get all', (done) => {
      request(app)
        .get('/product')
        .set({
            'Content-Type': 'application/json',
            access_token: admin_access_token,
        })
        .then(({ status, body }) => {
          expect(status).toBe(200);
          done();
        });
    });
  });

describe('GET /products/:id', () => {
  test('Success Get by Id', (done) => {
    request(app)
      .get(`/product/${newProduct.id}`)
      .set({
        'Content-Type': 'application/json',
        access_token: admin_access_token,
      })
      .then(({ status, body }) => {
        expect(status).toBe(200);
        done();
      });
  });
});

describe('PUT /products/:id', () => {
  test('Success Edit', (done) => {
    request(app)
      .put(`/product/${newProduct.id}`)
      .set({
        'Content-Type': 'application/json',
        access_token: admin_access_token,
      })
      .send({
        name: 'sandal swallow',
        image_url: 'http://sandal',
        price: 17000,
        stock: 3,
        category: 'Perabot'
      })
      .then(({ status, body }) => {
        expect(status).toBe(200);
        done();
      });
  });
});

describe('DELETE /products/:id', () => {
  test('Success Delete Product', (done) => {
    request(app)
      .delete(`/product/${newProduct.id}`)
      .set({
        'Content-Type': 'application/json',
        access_token: admin_access_token,
      })
      .then(({ status, body }) => {
        expect(status).toBe(200);
        done();
      })
      .catch((err)=>{
        next(err);
      })
  });
});