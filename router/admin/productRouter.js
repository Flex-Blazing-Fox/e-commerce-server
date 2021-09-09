const ProductController = require('../../controller/productController')
const { adminAuthorization } = require('../../middleware/authorization')

const router = require('express').Router()

router.get('/', ProductController.readAll)
router.post('/', ProductController.addProduct)
router.get('/:id', adminAuthorization, ProductController.readDetail)
router.put('/:id', adminAuthorization, ProductController.updateProduct)
router.patch('/:id', adminAuthorization, ProductController.updateStock)
router.delete('/:id', adminAuthorization, ProductController.delete)

module.exports = router