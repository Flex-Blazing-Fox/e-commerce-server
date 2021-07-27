const router = require('express').Router()
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const productRouter = require('./productRouter')

router.get('/', (req, res) => {
    res.send({"message":"Server is running"})
})

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/products', productRouter)

module.exports = router