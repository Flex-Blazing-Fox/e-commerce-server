const router = require('express').Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')
const errorHandler = require('../middlewares/errorHandler')

router.use('/', userRouter)

router.use('/product', productRouter)
router.use('/cart', cartRouter)
router.use(errorHandler)

module.exports = router