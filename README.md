# e-commerce-server

***Getting Started for Server Side***

- _Jalankan `npm install` di terminal_
- _Edit file `config.js` sesuai dengan database masing masing :_
- _Setting `.env` diperlukan agar app dapat berjalan sebagaimana semestinya_ :
    * _Sesuaikan `JWT_KEY` yang sudah ditentukan_
    * _Sesuaikan `DB_USERNAME` yang sudah ditentukan_
    * _Sesuaikan `DB_PASSWORD` yang sudah ditentukan_
    * _Sesuaikan `DB_NAME` yang sudah ditentukan_
    * _Sesuaikan `CLIENT_ID` yang sudah ditentukan_
    * _Sesuaikan `DEFAULT_PASSWORD` yang sudah ditentukan_
- _Jalankan `sequelize db:migrate` untuk migrasi ke database_
- _Jalankan `sequelize db:migrate:undo:all` untuk menghapus migrasi di database_
- _Jalankan `nodemon app.js` untuk menjalankan applikasi server side._
 
## Available Endpoint _Kanban_

_Users :_

* `POST /register`
* `POST /login`

Product :_

* `POST /product`
* `GET /product`
* `GET /product/:id`
* `PUT /product/:id`
* `DELETE /product/:id`

## RESTful Endpoint
 
### User Register :

> Buat / daftar user baru

* _URL_
  ```
  /register
  ```
* _Method_
  ```
  POST
  ```
* _URL Params_
  ```
  None
  ```
* _Data Params_
  ```
  {
    "email": req.body.email,
    "password": req.body.password
  }
  ```
* _Response_

  **Code 201** : Jika request berhasil

  ```
  {
    "message": "User Created"
  }
  ```

  **Code 400** : Jika validasi tidak terpenuhi

  ```
  {
    "errors": [
        "Email can not be null",
        "Email has been used",
        "Email format is not correct",
        "Email can not be empty"
        "Password at least have 6 characters",
        "Password can not be null"
        "Password can not be empty"
    ]
  }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
  {
    "errors": [
      "Internal server error"
    ]
  }
  ```

  ### User Login :
   
> login ke applikasi

* _URL_

  ```
  /login
  ```

* _Method_

  ```
  POST
  ```

* _URL Params_

  ```
  None
  ```

* _Data Params_

  ```
  {
    "email": req.body.email,
    "password": req.body.password
  }
  ```

* _Response_

  **Code 200** : Jika request berhasil

  ```
  {
    "success": true,
    "access_token": access_token
  }
  ```

  **Code 401** : Jika validasi tidak terpenuhi

  ```
  {
    "errors": [
      "Email or Password is wrong"
    ]
  }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
  {
    "errors": [
      "Internal server error"
    ]
  }
  ```

  ### Get Product :
> Menampilkan semua product 

* _URL_
  ```
  /product
  ```

* _Method_
  ```
  GET
  ```

* _URL Params_
  ```
  None
  ```

* _Data Params_
  ```
  None
  ```

* _Response_

  **Code 200** : Jika request berhasil

  ```
    {
        "data": [
            {
                "id": 2,
                "name": "Adidas",
                "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1a8P0cOAx7GAsW_5QmlwMze8xNqhyiwPq1g&usqp=CAU",
                "price": 250000,
                "stock": 10,
                "createdAt": "2021-08-03T15:32:02.476Z",
                "updatedAt": "2021-08-03T15:32:02.476Z"
            },
            {
                "id": 3,
                "name": "Adidas",
                "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1a8P0cOAx7GAsW_5QmlwMze8xNqhyiwPq1g&usqp=CAU",
                "price": 250000,
                "stock": 10,
                "createdAt": "2021-08-03T16:25:52.862Z",
                "updatedAt": "2021-08-03T16:25:52.862Z"
            }
        ]
    }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
  {
    "errors": [
      "Internal server error"
    ]
  }
  ```

  ### Add Product :
> Menambahkan task baru

* _URL_
  ```
  /product
  ```

* _Method_
  ```
  POST
  ```

* _URL Params_
  ```
  None
  ```

* _Data Params_
  ```
  {
    "title": req.body.title,
    "category": req.body.title,
    "userId" : req.userId
  }
  ```

* _Response_

  **Code 201** : Jika request berhasil

  ```
  {
    "data": {
        "id": 9,
        "name": "Piero",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1a8P0cOAx7GAsW_5QmlwMze8xNqhyiwPq1g&usqp=CAU",
        "price": 150000,
        "stock": 10,
        "updatedAt": "2021-08-04T14:03:58.369Z",
        "createdAt": "2021-08-04T14:03:58.369Z"
    }
}
  ```

  **Code 400** : Validasi tidak terpenuhi,

  Jika ada value attributes berupa `empty string` maka akan mengeluarkan error validasi sesuai attributenya

  ```
      {
        "errors": [
            "Validation notEmpty on name failed",
            "Validation notEmpty on image_url failed",
            "Validation notEmpty on price failed",
            "Validation notEmpty on stock failed",
        ]
      }
  ```

### Edit Product :

> Put Product

* _URL_

  ```
    /product
  ```

* _Method_

  ```
   PUT
  ```

* _URL Params_

  ```
    id
  ```

* _Data Params_

  ```
    {
      "name": req.body.name
      "image_url": req.body.image_url
      "price": req.body.price
      "stock": req.body.stock
    }
  ```

* _Response_

  **Code 200** : Jika request berhasil

  ```
    {
      "data": {
        "id": 7,
        "name": "Nike",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkCPgIUJaK0f3T604K3uqRJ6_Q_X3mYIhRGQ&usqp=CAU",
        "price": "210000",
        "stock": "40",
        "createdAt": "2021-08-04T12:26:56.410Z",
        "updatedAt": "2021-08-04T14:24:14.352Z"
      }
    }
  ```

  **Code 400** : Validasi tidak terpenuhi,

  Jika ada value berupa `empty` maka akan mengeluarkan error validasi sesuai attributenya

  ```
    {
      "errors": [
          "Product name cannot be empty",
          "Product image_url cannot be empty",
          "Product price cannot be empty",
          "Product stock cannot be empty"
      ]
    }
  ```

  Jika ada value berupa `null` maka akan mengeluarkan error validasi sesuai attributenya

  ```
    {
      "errors": [
          "Product name cannot be null",
          "Product image_url cannot be null",
          "Product price cannot be null",
          "Product stock cannot be null"
      ]
    }
  ```

  **Code 404** : Jika Product tidak ditemukan

  ```
    {
      "errors": [
        "Product not found"
      ]
    }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
    {
      "errors": [
        "Internal server error"
      ]
    }
  ```


  ### Delete task :

> Delete task by id

* _URL_
  ```
    /tasks
  ```

* _Method_
  ```
    DELETE
  ```

* _URL Params_
  ```
    id
  ```

* _Data Params_
  ```
    None
  ```

* _Response_

  **Code 200** : Jika request berhasil

  ```
    {
        "message": "Product success to delete"
    }
  ```

  **Code 404** : Jika product tidak ditemukan

  ```
    {
      "errors": [
        "Product not found"
      ]
    }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
    {
      "errors": [
        "Internal server error"
      ]
    }
  ```

