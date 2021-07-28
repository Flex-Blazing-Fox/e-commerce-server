if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const errHandler = require('./middleware/errHandler')
const app = express()
const router = require('./router')
const PORT = process.env.PORT || 3000
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)
app.use(errHandler)
app.listen(PORT, ()=>{
    console.log(`listen on port: ${PORT}`);
})