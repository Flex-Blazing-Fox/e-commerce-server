const jwt = require('jsonwebtoken')
const {User,Product} = require('../models')

const authentication = (req, res, next) => {
    if (!req.headers.access_token) return next( {name: "Missing access token"})
    
    try{
        const decoded = jwt.verify(req.headers.access_token, process.env.JWT_KEY)
        req.userId = decoded.id
        req.role = decoded.role
        User.findByPk(req.userId)
        .then(user => {
            if (!user){
                throw {name: "JsonWebTokenError"}
            } else {
                req.userId = user.id
                req.role = user.role
                // console.log(user.role,"?????");
                next()
            }
        })
        .catch(err => {
            next(err)
        })
        // req.userId = decoded.id
        // next()
    }
    catch(err) {
        next( {name: "Invalid access_token"})
    }
}

const authorization = (req, res, next) => {
    // console.log("masuk");
    // console.log(req.role,">>>>>>");
    if(req.role !== 'admin') throw ( {name: "Accses Denied"})
    const {id} = req.params
    Product.findOne({ where: {
        id
        // userId : req.userId
    }})
    .then((product) => {
        if(!product) throw ( {name: "Product Not Found"})

        req.product = product
        next()
    })
    .catch(err => [
        // console.log(err)
        next(err)
    ])
}

module.exports = {authentication, authorization}