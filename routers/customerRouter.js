const router = require('express').Router()
const CustomerControler = require('../controllers/CustomerController')

router.post('/login', CustomerControler.login)
router.post('/register', CustomerControler.register)

module.exports = router