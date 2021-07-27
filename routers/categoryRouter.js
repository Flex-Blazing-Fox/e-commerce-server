const CategoryController = require('../controllers/CategoryController')

const router = require('express').Router()

router.get('/', CategoryController.getAllCategories)
router.post('/', CategoryController.addCategory)
router.get('/:id', CategoryController.findCategoryById)
router.put('/:id', CategoryController.updateCategory)
router.delete('/:id', CategoryController.deleteCategory)

module.exports = router