const AdminController = require('../../controller/adminController')
const { adminAuthentication } = require('../../middleware/authentication')
const { adminAuthorization } = require('../../middleware/authorization')
const product = require('./productRouter')

const router = require('express').Router()

router.post('/register', AdminController.register)
router.post('/login', AdminController.login)

//product
router.get('/product', adminAuthentication, adminAuthorization, product)

module.exports = router