const router = require('express').Router()
const CartController = require('../controllers/CartController')

router.get('/', CartController.showCart)
router.post('/:id', CartController.addToCart)
router.patch('/add/:id', CartController.add)
router.patch('/sub/:id', CartController.sub)
router.delete('/:id', CartController.delete)

module.exports = router