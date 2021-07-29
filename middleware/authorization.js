const {Product} = require('../models')

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
// const custAuthorization = (req, res, next)=>{
//     const{id} = req.params
//
//     Cart.findOne({
//         where:{
//             id,
//             userId: req.user.id
//         }
//     })
//     .then(result=>{
//         if(!result){
//             throw {name: 'CART_IS_EMPTY'}
//         }else{
//             req.product = result
//             next()
//         }
//     })
//     .catch(err=>{
//         next(err)
//     })
// }

module.exports = {adminAuthorization}//, custAuthorization}