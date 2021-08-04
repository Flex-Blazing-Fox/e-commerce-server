const ProductController = require('../controllers/ProductController')
const { authorization } = require('../middlewares/auth')
const router = require('express').Router()

router.get('/',ProductController.getAllProduct)
router.post('/',authorization,ProductController.addProduct)
router.put('/:id',authorization,ProductController.editProduct)
router.delete('/:id',authorization,ProductController.deleteProduct)

module.exports = router