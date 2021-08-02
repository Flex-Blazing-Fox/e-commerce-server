const AdminController = require('../../controller/adminController')
const { adminAuthentication } = require('../../middleware/authentication')
const product = require('./productRouter')

const router = require('express').Router()

router.post('/register', AdminController.register)
router.post('/login', AdminController.login)

//product
router.use('/product', adminAuthentication, product)

module.exports = router