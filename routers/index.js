const router = require('express').Router()
const adminRouter = require('./adminRouter')
const productRouter = require('./productRouter')

const AdminController = require('../controllers/AdminController')
const ProductController = require('../controllers/ProductController')

router.get('/', (req, res) => {
  res.send('ecommerce')
})

router.use('/admin')
router.use('/products')

module.exports = router