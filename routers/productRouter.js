const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/',ProductController.getAllProduct)
router.get('/:id',ProductController.getProductById)

router.use(authentication)
//authorization admin
router.post('/',authorization,ProductController.addProduct)
router.put('/:id',authorization,ProductController.editProduct)
router.delete('/:id',authorization,ProductController.deleteProduct)

module.exports = router