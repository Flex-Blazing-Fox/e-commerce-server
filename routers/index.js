const router = require('express').Router()
const userRouter = require('./userRouter')

router.get('/', (req, res) => {
    res.send({"message":"Server is running"})
})

router.use('/user', userRouter)

module.exports = router