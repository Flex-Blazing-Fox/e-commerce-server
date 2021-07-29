const router = require('express').Router()
const { authenticate, authorize } = require('../middlewares/auth')

const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProduct)
router.post('/', authenticate, authorize, ProductController.addProduct)
router.put('/:id', authenticate, authorize, ProductController.editProduct)
router.delete('/:id', authenticate, authorize, ProductController.deleteProduct)

module.exports = router
