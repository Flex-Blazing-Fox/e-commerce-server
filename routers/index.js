const router = require('express').Router()
const userRouter = require('./userRouter')
const { authentication } = require('../middlewares/auth')
const productRouter = require('./productRouter')
const errorHandler = require('../middlewares/errorHandler')

router.use('/', userRouter)
router.use(authentication)
router.use('/product', productRouter)
router.use(errorHandler)

module.exports = router