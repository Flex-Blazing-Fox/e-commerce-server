const {Product, Cart} = require('../models')

const adminAuthorization = (req, res, next)=>{
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

//untuk cart
const custAuthorization = (req, res, next)=>{
    const custId = req.cust.id
    Cart.findAll({
        where: {
            custId
        },
        include: [
            {model: Product}
        ]
    })
    .then(result=>{
        req.cart = result
        next()
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = {adminAuthorization, custAuthorization}