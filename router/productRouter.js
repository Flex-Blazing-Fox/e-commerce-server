const { authorization } = require('../middleware/auth')
const ProductController = require('../controller/productController')

const router = require('express').Router()
router.get('/', ProductController.readAll)
router.post('/', authorization, ProductController.addProduct)
router.get('/:id', ProductController.readDetail)
router.put('/:id', authorization, ProductController.updateProduct)
router.delete('/:id', authorization, ProductController.delete)

module.exports = router