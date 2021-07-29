const router = require('express').Router()
const { authenticate, authorize } = require('../middlewares/auth')

const TypeController = require('../controllers/TypeController')

router.use(authenticate)
router.use(authorize)
router.get('/', TypeController.getTypes)
router.get('/:id', TypeController.getType)
router.post('/', TypeController.addType)
router.put('/:id', TypeController.editType)
router.delete('/:id', TypeController.deleteType)

module.exports = router