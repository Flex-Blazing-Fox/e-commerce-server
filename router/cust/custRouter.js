const { custAuthentication } = require('../../middleware/authentication')
const product = require('./productRouter')
const UserController = require('../../controller/adminController')

const router = require('express').Router()
router.post('/register', UserController.register)
router.post('/login', UserController.login)

//product
router.get('/product', custAuthentication, product)

module.exports = router