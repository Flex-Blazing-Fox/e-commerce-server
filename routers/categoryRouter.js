const CategoryController = require('../controllers/CategoryController')
const { authorization, authentication } = require('../middleware/auth')

const router = require('express').Router()

router.get('/', CategoryController.getAllCategories)
router.get('/:id', CategoryController.findCategoryById)
router.post('/', authentication, authorization, CategoryController.addCategory)
router.put('/:id',  authentication, authorization, CategoryController.updateCategory)
router.delete('/:id',  authentication, authorization, CategoryController.deleteCategory)

module.exports = router