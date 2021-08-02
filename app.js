if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const router = require('./router')
const cors = require('cors')
const errHandler = require('./middleware/errHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)
app.use(errHandler)

// const PORT = process.env.PORT || 3000


// app.listen(PORT, ()=>{
//     console.log(`listen on port: ${PORT}`);
// })

module.exports = app