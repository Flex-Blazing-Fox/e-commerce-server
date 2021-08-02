const ProductController = require('../../controller/productController')

const router = require('express').Router()

router.get('/', ProductController.readAll)
router.get('/:id', ProductController.readDetail)
router.patch('/:id', ProductController.updateStock)

module.exports = router