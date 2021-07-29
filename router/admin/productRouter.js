const ProductController = require('../../controller/productController')

const router = require('express').Router()

router.get('/', ProductController.readAll)
router.post('/', ProductController.addProduct)
router.get('/:id', ProductController.readDetail)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.delete)

module.exports = router