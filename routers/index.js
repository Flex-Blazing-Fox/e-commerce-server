const router = require('express').Router()
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const productRouter = require('./productRouter')
const videoRouter = require('./videoRouter')
const cartRouter = require('./cartRouter')
const shippingRouter = require('./shippingRouter')

router.get('/', (req, res) => {
    res.send({"message":"Server is running"})    
})

router.use('/users', userRouter)
router.use('/videos', videoRouter)
router.use('/cart', cartRouter)
router.use('/shipping', shippingRouter)
router.use('/category', categoryRouter)
router.use('/products', productRouter)

module.exports = router