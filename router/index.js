const router = require('express').Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const { authentication } = require('../middleware/auth')

router.use('/user', userRouter)
router.use('/product', authentication, productRouter)

module.exports = router