const { Product } = require('../models')
class ProductController{
    static readAll(req, res, next){
        Product.findAll()
        .then(result => {
            if(result.length>0){
                res.status(200).json(result)
            }
            else{
                throw{name: 'PRODUCT_NOT_FOUND'}
            }
        })
        .catch(err => {
            next(err)
        })
    }
    static readDetail(req, res, next){
        const {id} = req.params
        Product.findOne({
            where : {id},
        })
        .then(result=>{
            if(!result){
                throw {name: 'PRODUCT_NOT_FOUND'}
            }else{
                res.status(200).json({result})
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    static addProduct(req, res, next){
        const {name, image_url, price, stock} = req.body
        Product.create({name, image_url, price, stock})
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }
    static delete(req, res, next){
        const product = req.product
        product.destroy()
        .then(() => {
            res.status(200).json({message: "Success deleted product"})
        })
        .catch(err => {
            next(err)
        })
    }
    static updateProduct(req, res, next){
        const product = req.product
        const {name, image_url, price, stock} = req.body
        product  = {name, image_url, price, stock}

        product.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
    static updateStock(req, res, next){
        const product = req.product
        const {stock} = req.body
        product.stock  = stock

        product.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController