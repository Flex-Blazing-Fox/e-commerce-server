# e-commerce-server

### Inital Setup
```
$ npm install
```

### Database Setup
```
$ sequelize db:migrate
$ sequelize db:seed:all
```

### Run Application
```
$ npm run dev
```

### Base URL :
```
http://127.0.0.1:3000
```
### **GET / Show All Product**

- **URL**
    ```
    /products
    ```
- **Method**
    ```
    GET
    ```
- **URL Params**
    ```
    none
    ```
- **Success Respon**
    - Code: 200
        ```json
        [
            {
                "id": 1,
                "name": "Expresso",
                "image_url": "http://www.example.com/image.jpg",
                "price": 0,
                "stock": 0,
                "categoryId": 2,
                "createdAt": "2021-07-27T13:31:58.165Z",
                "updatedAt": "2021-07-30T10:20:04.926Z",
                "Category": {
                    "id": 2,
                    "categoryName": "Coffe",
                    "createdAt": "2021-07-27T13:16:28.456Z",
                    "updatedAt": "2021-07-27T13:16:28.456Z"
                }
            }
        ]
        ```
- **Error Respon**
    - Code: 500

### **GET / Get Product By Id**

- **URL**
    ```
    /products/:id
    ```
- **Method**
    ```
    GET
    ```
- **URL Params**
    ```
    id
    ```
- **Success Respon**
    - Code: 200
        ```json
        {
            "id": 2,
            "name": "Expresso",
            "image_url": "http://www.example.com/image.jpg",
            "price": 15000,
            "stock": 1,
            "categoryId": 2,
            "createdAt": "2021-07-27T13:32:48.527Z",
            "updatedAt": "2021-07-27T13:32:48.527Z"
        }
        ```
- **Error Respon**
    - Code: 404
        ```json
        [
            {
                "message": "Tak Not Found"
            }
        ]
        ```
## User API
---

### **POST / User Login**

- **URL**

    ```
    /users/login
    ```

- **Method**

    ```
    POST
    ```

- **URL Params**
    ```
    none
    ```
- **Body** urlencoded

    
    Key         | Value 
    ----------- |------
    email       | admin@mail.com
    password    | 123456

    
- Success Response :
    - Code : 200
        ```json
        {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6MSwiaWF0IjoxNjI2MTg2MDI3fQ.kWjGtwmY0RsgdVQFz5J5i5DSSb8ptWf5rDpMfTb0rWs"
        }
        ```
- Success Response :
    - Code : 401
        ```json
        [
            {
                "message": "Login Failed"
            }
        ]
        ```