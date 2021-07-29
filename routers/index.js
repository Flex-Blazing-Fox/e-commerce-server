const router = require('express').Router()
const adminRouter = require('./adminRouter')
const productRouter = require('./productRouter')
const typeRouter = require('./typeRouter')

router.get('/', (req, res) => {
  res.send('ecommerce')
})

router.use('/admin', adminRouter)
router.use('/products', productRouter)
router.use('/types', typeRouter)

module.exports = router