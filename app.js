if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const errorHandler = require('./middleware/errorHandler')
const routers = require('./routers')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routers)
app.use(errorHandler)

module.exports = app