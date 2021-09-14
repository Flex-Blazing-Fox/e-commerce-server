# e-commerce-server

**How to run the server:**
 - Install packages by running : 
 ```
 $ npm install
 ```
 - Migrate db : 
 ```
 $ sequelize db:migrate
 ```
 - Setup a development server: 
 ```
 $ npm run dev
 ```

BASE_URL: <br>
`http://localhost:3000`

---
## Admin Login
Login to the app as an admin.
* **URL** <br>
/admin/login
* **Method** <br>
`POST`
* **URL Params** <br>
None
* **Data Params** <br>
**Required:**
    ```
    {
      "email": "admin@mail.com",
      "password": "your_password"
    }
    ```
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyNzU2MjA3OX0.zXVXgCZuWd7odlKvnq1sMfjbk8HthQ4Em0kEF5EvsXI",
          "user": {
            "id": 1,
            "email": "admin@mail.com",
            "role": "admin"
          }
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 400,
            "title": "IncorrectCredentialsError",
            "detail": "Email or password is wrong"
          }
        ]
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 500,
            "title": "ServerError",
            "detail": "Internal server error"
          }
        ]
      }
      ```
      
---

## Add Type
Add a new type.
* **URL** <br>
/types
* **Method** <br>
`POST`
* **URL Params** <br>
None
* **Data Params** <br>
**Required:**
    ```
    {
      "name": "t-shirt",
    }
    ```
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "type": {
            "id": 9,
            "name": "t-shirt",
            "updatedAt": "2021-07-29T14:51:25.106Z",
            "createdAt": "2021-07-29T14:51:25.106Z"
          }
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 400,
            "title": "UniqueTypeError",
            "detail": "Type already exists"
          }
        ]
      }
      ```

    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 400,
            "title": "Validation error",
            "detail": "type name must not be empty"
          }
        ]
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 500,
            "title": "ServerError",
            "detail": "Internal server error"
          }
        ]
      }
      ```
      
---

## Get a Type
Get a type.
* **URL** <br>
/types
* **Method** <br>
`GET`
* **URL Params** <br>
id
* **Data Params** <br>
None
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "type": {
            "id": 3,
            "name": "sling bag",
            "createdAt": "2021-07-29T14:03:53.829Z",
            "updatedAt": "2021-07-29T14:03:53.829Z"
          }
        }
        ```
* **Error Response:**
    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 500,
            "title": "ServerError",
            "detail": "Internal server error"
          }
        ]
      }
      ```
      
---

## Get Type List
Get a list types.
* **URL** <br>
/types
* **Method** <br>
`GET`
* **URL Params** <br>
None
* **Data Params** <br>
None
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "types": [
            {
              "id": 3,
              "name": "sling bag",
              "createdAt": "2021-07-29T14:03:53.829Z",
              "updatedAt": "2021-07-29T14:03:53.829Z"
            },
            {
              "id": 2,
              "name": "shoes",
              "createdAt": "2021-07-29T13:50:42.131Z",
              "updatedAt": "2021-07-29T14:09:30.792Z"
            },
            {
              "id": 9,
              "name": "t-shirt",
              "createdAt": "2021-07-29T14:51:25.106Z",
              "updatedAt": "2021-07-29T14:51:25.106Z"
            },
            {
              "id": 10,
              "name": "shirt",
              "createdAt": "2021-07-29T14:53:45.365Z",
              "updatedAt": "2021-07-29T14:53:45.365Z"
            }
          ]
        }
        ```
* **Error Response:**
    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 500,
            "title": "ServerError",
            "detail": "Internal server error"
          }
        ]
      }
      ```
      
---

## Edit Type
Edit a type.
* **URL** <br>
/types
* **Method** <br>
`PUT`
* **URL Params** <br>
id
* **Data Params** <br>
**Required:**
    ```
    {
      "name": "shoes",
    }
    ```
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "type": {
              "id": 2,
              "name": "shoes",
              "createdAt": "2021-07-29T13:50:42.131Z",
              "updatedAt": "2021-07-29T15:45:46.862Z"
          }
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 400,
            "title": "UniqueTypeError",
            "detail": "Type already exists"
          }
        ]
      }
      ```

    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 400,
            "title": "Validation error",
            "detail": "type name must not be empty"
          }
        ]
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 500,
            "title": "ServerError",
            "detail": "Internal server error"
          }
        ]
      }
      ```
      
---

## Delete Type
Delete a type.
* **URL** <br>
/types
* **Method** <br>
`DELETE`
* **URL Params** <br>
id
* **Data Params** <br>
None
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "message": "Type deleted"
        }
        ```
* **Error Response:**
    * **Code:** 404 <br>
      **Content:**
      ```
      {
        "errors": [
          { 
              "status": 404,
              "title": "TypeNotFound",
              "detail": "Type not found"
          }
        ]
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 500,
            "title": "ServerError",
            "detail": "Internal server error"
          }
        ]
      }
      ```
      
---

## Add Produt
Add a new product.
* **URL** <br>
/products
* **Method** <br>
`POST`
* **URL Params** <br>
None
* **Data Params** <br>
**Required:**
    ```
    {
      "name": "sling bag hijau",
      "image_url": "https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50",
      "price": 10000,
      "stock": 10,
      "type_name": "sling bag"
    }
    ```
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "product": {
            "id": 17,
            "name": "sling bag ungu",
            "image_url": "https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50",
            "price": 10000,
            "stock": 10,
            "updatedAt": "2021-07-29T15:47:11.028Z",
            "createdAt": "2021-07-29T15:47:11.028Z"
          },
          "type_name": "sling bag"
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 400,
            "title": "UniqueProductError",
            "detail": "Product already exists"
          }
        ]
      }
      ```

    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 400,
            "title": "Validation error",
            "detail": "type name must not be empty"
          }
        ]
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 500,
            "title": "ServerError",
            "detail": "Internal server error"
          }
        ]
      }
      ```
      
---

## Get a Product
Get a product.
* **URL** <br>
/products
* **Method** <br>
`GET`
* **URL Params** <br>
id
* **Data Params** <br>
None
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "product": {
            "id": 13,
            "name": "sepatu pantopel",
            "image_url": "https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50",
            "price": 10000,
            "stock": 10,
            "createdAt": "2021-07-29T14:37:43.228Z",
            "updatedAt": "2021-07-29T15:42:45.777Z",
            "Product_Types": [
                {
                  "id": 4,
                  "product_id": 13,
                  "type_id": 2,
                  "createdAt": "2021-07-29T14:37:43.235Z",
                  "updatedAt": "2021-07-29T15:42:45.782Z",
                  "Type": {
                    "id": 2,
                    "name": "shoes",
                    "createdAt": "2021-07-29T13:50:42.131Z",
                    "updatedAt": "2021-07-29T15:45:46.862Z"
                  }
                }
            ]
          }
        }
        ```
* **Error Response:**
    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 500,
            "title": "ServerError",
            "detail": "Internal server error"
          }
        ]
      }
      ```
      
---

## Get Product List
Get a list types.
* **URL** <br>
/products
* **Method** <br>
`GET`
* **URL Params** <br>
None
* **Data Params** <br>
None
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "products": [
            {
              "id": 13,
              "name": "sepatu pantopel",
              "image_url": "https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50",
              "price": 10000,
              "stock": 10,
              "createdAt": "2021-07-29T14:37:43.228Z",
              "updatedAt": "2021-07-29T15:42:45.777Z",
              "Product_Types": [
                {
                  "id": 4,
                  "product_id": 13,
                  "type_id": 2,
                  "createdAt": "2021-07-29T14:37:43.235Z",
                  "updatedAt": "2021-07-29T15:42:45.782Z",
                  "Type": {
                    "id": 2,
                    "name": "shoes",
                    "createdAt": "2021-07-29T13:50:42.131Z",
                    "updatedAt": "2021-07-29T15:45:46.862Z"
                  }
                }
              ]
            },
            {
              "id": 14,
              "name": "sling bag hijau",
              "image_url": "https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50",
              "price": 10000,
              "stock": 10,
              "createdAt": "2021-07-29T15:08:56.383Z",
              "updatedAt": "2021-07-29T15:08:56.383Z",
              "Product_Types": [
                {
                  "id": 5,
                  "product_id": 14,
                  "type_id": 3,
                  "createdAt": "2021-07-29T15:08:56.390Z",
                  "updatedAt": "2021-07-29T15:08:56.390Z",
                  "Type": {
                    "id": 3,
                    "name": "sling bag",
                    "createdAt": "2021-07-29T14:03:53.829Z",
                    "updatedAt": "2021-07-29T14:03:53.829Z"
                  }
                }
              ]
            },
            {
              "id": 17,
              "name": "sling bag ungu",
              "image_url": "https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50",
              "price": 10000,
              "stock": 10,
              "createdAt": "2021-07-29T15:47:11.028Z",
              "updatedAt": "2021-07-29T15:47:11.028Z",
              "Product_Types": [
                {
                  "id": 6,
                  "product_id": 17,
                  "type_id": 3,
                  "createdAt": "2021-07-29T15:47:11.032Z",
                  "updatedAt": "2021-07-29T15:47:11.032Z",
                  "Type": {
                    "id": 3,
                    "name": "sling bag",
                    "createdAt": "2021-07-29T14:03:53.829Z",
                    "updatedAt": "2021-07-29T14:03:53.829Z"
                  }
                }
              ]
            }
          ]
        }
        ```
* **Error Response:**
    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 500,
            "title": "ServerError",
            "detail": "Internal server error"
          }
        ]
      }
      ```
      
---

## Edit Product
Edit a product.
* **URL** <br>
/products
* **Method** <br>
`PUT`
* **URL Params** <br>
id
* **Data Params** <br>
**Required:**
    ```
    {
      "name": "sepatu pantopel",
      "image_url": "https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50",
      "price": 10000,
      "stock": 10,
      "type_name": "shoes"
    }
    ```
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "product": {
            "id": 13,
            "name": "sepatu pantopel",
            "image_url": "https://rukminim1.flixcart.com/image/714/857/jzhb24w0/sling-bag/p/v/d/sling-sb-101-sling-bag-wingspan-original-imafyuvty2kzymr7.jpeg?q=50",
            "price": 10000,
            "stock": 10,
            "createdAt": "2021-07-29T14:37:43.228Z",
            "updatedAt": "2021-07-29T15:42:45.777Z"
          },
          "type_name": "shoes"
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 400,
            "title": "UniqueTypeError",
            "detail": "Type already exists"
          }
        ]
      }
      ```

    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 400,
            "title": "Validation error",
            "detail": "type name must not be empty"
          }
        ]
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 500,
            "title": "ServerError",
            "detail": "Internal server error"
          }
        ]
      }
      ```
      
---

## Delete Product
Delete a product.
* **URL** <br>
/products
* **Method** <br>
`DELETE`
* **URL Params** <br>
id
* **Data Params** <br>
None
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "message": "Product deleted"
        }
        ```
* **Error Response:**
    * **Code:** 404 <br>
      **Content:**
      ```
      {
        "errors": [
          { 
              "status": 404,
              "title": "ProductNotFound",
              "detail": "Product not found"
          }
        ]
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "errors": [
          {
            "status": 500,
            "title": "ServerError",
            "detail": "Internal server error"
          }
        ]
      }
      ```
      
---