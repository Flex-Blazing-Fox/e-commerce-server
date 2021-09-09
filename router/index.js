const router = require('express').Router()
const adminRouter = require('./admin/adminRouter')
const custRouter = require('./cust/custRouter')

router.use('/admin', adminRouter)
router.use('/customer', custRouter)

module.exports = router