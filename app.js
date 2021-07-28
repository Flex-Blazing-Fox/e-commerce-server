const express = require('express')
const cors = require('cors')
const app = express()
const errorHandler = require('./middlewares/errorHandler')
const routers = require('./routers')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routers)
app.use(errorHandler)

module.exports = app