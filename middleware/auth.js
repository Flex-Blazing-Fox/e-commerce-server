const {User, Product} = require('../models')
const jwt = require('jsonwebtoken')

const authentication = (req, res, next)=>{
    if(!req.headers.access_token){
        throw {name: 'NOT_LOGIN'}
    }
    try{
        const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
        User.findOne({where:{
            id: decoded.userId
        }})
        .then(result=>{
            if(result){
                req.user = {
                    id: result.id,
                    role: result.role
                }
                next() 
            }else{
                throw{name: 'USER_NOT_FOUND'}
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    catch(err){
        next({name: 'INVALID_TOKEN'})
    }
}
const authorization = (req, res, next)=>{
    if(req.user.role !== 'Admin'){
        throw {name: 'ACCESS_DENIED'}
    }
    const{id} = req.params
    Product.findOne({
        where:{
            id
        }
    })
    .then(result=>{
        if(!result){
            throw {name: 'PRODUCT_NOT_FOUND'}
        }else{
            req.product = result
            next()
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = {authentication, authorization}