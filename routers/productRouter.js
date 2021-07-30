const ProductController = require('../controllers/ProductController')
const { authorization, authentication } = require('../middleware/auth')

const router = require('express').Router()

router.get('/', ProductController.getAllProduct)
router.get('/:id', ProductController.findProductById)
router.post('/', authentication, authorization, ProductController.addProduct)
router.put('/:id', authentication, authorization, ProductController.updateProduct)
router.delete('/:id', authentication, authorization,ProductController.deleteProduct)

module.exports = router