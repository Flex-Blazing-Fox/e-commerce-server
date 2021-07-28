const router = require('express').Router()
const adminRouter = require('./adminRouter')
const productRouter = require('./productRouter')

router.get('/', (req, res) => {
  res.send('ecommerce')
})

router.use('/admin', adminRouter)
router.use('/products', productRouter)

module.exports = router