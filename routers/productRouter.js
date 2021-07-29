const router = require('express').Router()

const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProduct)
router.post('/', ProductController.addProduct)
router.put('/:id', ProductController.editProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router
