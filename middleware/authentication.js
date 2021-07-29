const {User, Product} = require('../models')
const jwt = require('jsonwebtoken')

const adminAuthentication = (req, res, next)=>{
    if(!req.headers.access_token){
        throw {name: 'NOT_LOGIN'}
    }
    try{
        const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
        User.findOne({where:{
            id: decoded.userId,
            role: 'Admin'
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

const custAuthentication = (req, res, next)=>{
    if(!req.headers.access_token){
        throw {name: 'NOT_LOGIN'}
    }
    try{
        const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
        User.findOne({where:{
            id: decoded.userId,
            role: 'Customer'
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

module.exports = {adminAuthentication, custAuthentication}