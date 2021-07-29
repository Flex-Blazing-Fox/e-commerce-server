const router = require('express').Router()

const TypeController = require('../controllers/TypeController')

router.get('/', TypeController.getTypes)
router.get('/:id', TypeController.getType)
router.post('/', TypeController.addType)
router.put('/:id', TypeController.editType)
router.delete('/:id', TypeController.deleteType)

module.exports = router