# e-commerce-server

kaban-server
# Dokumentasi API e-commerce-Server
### e-commerce
## Database
```
ecommerce_db
```

## Package
```
bcrypt, dotenv, express, jsonwebtoken, nodemon, pg, sequelize, cors, google-auth-library
```

## Migration
sequelize db:migrate

## Run Dev
```
npm run dev
```

### HTTP REQUEST
***BASE URL:***
```
http://127.0.0.1:3000
```

## Register Admin
- **URL:**
```
/admin/register
```
- **METHOD:**
```
POST
```
- **SUCCESS RESPONSE:**
```
CODE: 201
{
    "message": "Successfully Register",
    "email": "test2@mail.com"
}
```
- **ERROR RESPONSE:**
```
CODE: 500
```

## Login Admin
- **URL:**
```
/admin/login
```
- **METHOD:**
```
POST
```
- **SUCCESS RESPONSE:**
```
CODE: 200
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2Mjc2OTE1OTh9.I7hyJskt_AmGkfMEn7-fDpdqFQ134iZg1DDx3dSE4sU"
}
```
- **ERROR RESPONSE:**
```
CODE: 500
```

## Add Product
- **URL:**
```
/admin/product
```
- **METHOD:**
```
POST
```
- **SUCCESS RESPONSE:**
```
CODE: 201
{
    "id": 1,
    "name": "product_test_1",
    "image_url": "https://images.soco.id/164-headnshoulders.jpg.jpeg",
    "price": "38000",
    "stock": 10,
    "updatedAt": "2021-07-31T00:46:43.596Z",
    "createdAt": "2021-07-31T00:46:43.596Z"
}
```
- **ERROR RESPONSE:**
```
CODE: 500
```

## Show e-commerce
- **URL:**
```
/admin/product
```
- **METHOD:**
```
GET
```
- **SUCCESS RESPONSE:**
```
CODE: 200
[
    {
        "id": 1,
        "name": "product_test_1",
        "image_url": "https://images.soco.id/164-headnshoulders.jpg.jpeg",
        "price": "38000",
        "stock": 10,
        "createdAt": "2021-07-31T00:46:43.596Z",
        "updatedAt": "2021-07-31T00:46:43.596Z"
    }
]
```
- **ERROR RESPONSE:**
```
CODE: 500
```

## Show Detail
- **URL:**
```
/admin/product
```
- **METHOD:**
```
GET
```
- **PARAMS:**
```
id
```
- **SUCCESS RESPONSE:**
```
CODE: 200
{
    "result": {
        "id": 1,
        "name": "product_test_1",
        "image_url": "https://images.soco.id/164-headnshoulders.jpg.jpeg",
        "price": "38000",
        "stock": 10,
        "createdAt": "2021-07-31T00:46:43.596Z",
        "updatedAt": "2021-07-31T00:46:43.596Z"
    }
}
```
- **ERROR RESPONSE:**
```
CODE: 500
```

## Update All
- **URL:**
```
/admin/product
```
- **METHOD:**
```
put
```
- **PARAMS:**
```
id
```
- **SUCCESS RESPONSE:**
```
CODE: 200
{
    "id": 1,
    "name": "product_test_1_edit",
    "image_url": "https://images.soco.id/164-headnshoulders.jpg.jpeg",
    "price": "38000",
    "stock": "13",
    "createdAt": "2021-07-31T00:46:43.596Z",
    "updatedAt": "2021-07-31T01:09:54.362Z"
}
```
- **ERROR RESPONSE:**
```
CODE: 500
```


## Update Stock
- **URL:**
```
/admin/product
```
- **METHOD:**
```
put
```
- **PARAMS:**
```
id
```
- **SUCCESS RESPONSE:**
```
CODE: 200
{
    "id": 1,
    "name": "product_test_1_edit",
    "image_url": "https://images.soco.id/164-headnshoulders.jpg.jpeg",
    "price": "38000",
    "stock": "10",
    "createdAt": "2021-07-31T00:46:43.596Z",
    "updatedAt": "2021-07-31T01:12:10.869Z"
}
```
- **ERROR RESPONSE:**
```
CODE: 500
```

## Delete
- **URL:**
```
/admin/product
```
- **METHOD:**
```
delete
```
- **PARAMS:**
```
id
```
- **SUCCESS RESPONSE:**
```
CODE: 200
{
    "message": "Success deleted product"
}
```
- **ERROR RESPONSE:**
```
CODE: 500
```