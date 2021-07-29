const { custAuthentication } = require('../../middleware/authentication')
const product = require('./productRouter')
const CustController = require('../../controller/custController')

const router = require('express').Router()
router.post('/register', CustController.register)
router.post('/login', CustController.login)

//product
router.get('/product', custAuthentication, product)

module.exports = router