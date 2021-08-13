const TransaksiController = require('../controllers/TransaksiController')

const router = require('express').Router()

router.get('/province', TransaksiController.getProvince)

module.exports = router