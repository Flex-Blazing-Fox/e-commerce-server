const UserController = require('../../controller/adminController')
const { adminAuthentication } = require('../../middleware/authentication')
const { adminAuthorization } = require('../../middleware/authorization')
const product = require('./productRouter')

const router = require('express').Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

//product
router.get('/product', adminAuthentication, adminAuthorization, product)

module.exports = router