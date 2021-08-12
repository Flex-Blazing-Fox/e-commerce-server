const router = require('express').Router()
const CartController = require('../controllers/CartController')
const { authentication, authorization, authCustomerGeneral, authCustomerActions } = require('../middlewares/auth')

router.use(authentication)
router.post('/:productId',authorization, authCustomerGeneral,CartController.addToCart)
router.get('/',authCustomerGeneral,CartController.displayCart)
router.patch('/:cartId',authCustomerGeneral,authCustomerActions,CartController.patchQuantity)
router.delete('/:id',authCustomerGeneral,authCustomerActions,CartController.removeCart)

module.exports = router