const { custAuthentication } = require('../../middleware/authentication')
const product = require('./productRouter')
const CustController = require('../../controller/custController')
const { custAuthorization } = require('../../middleware/authorization')

const router = require('express').Router()
router.post('/register', CustController.register)
router.post('/login', CustController.login)
router.post('/googleSignIn', CustController.googleSignIn)
router.post('/cart', custAuthentication, CustController.addCart)
router.get('/cart', custAuthentication, CustController.getCart)
router.post('/checkout', custAuthentication, custAuthorization, CustController.checkout, CustController.midtrans)
router.post('/midtrans', CustController.midtrans)

//product
router.use('/product', product)

module.exports = router