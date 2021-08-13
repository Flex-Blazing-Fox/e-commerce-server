const { Product, Category } = require('../models')

class ProductController{
    static getAllProduct(req, res, next){
        Product.findAll({
            include:{
                model: Category
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static findProductById(req, res, next){
        const { id } = req.params

        Product.findOne({
            include:{
                model:Category
            },
            where:{id}})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static addProduct(req, res, next){
       
        let { name, image_url, price, stock, category } = req.body
        price = +price
        stock = +stock

        Product.create({ 
            name, 
            image_url, 
            price, 
            stock, 
            categoryId:category
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static updateProduct(req, res, next){
        const { id } = req.params
        let { name, image_url, price, stock, descriptions, category } = req.body
        price = +price
        stock = +stock

        Product.update({
            name, 
            image_url, 
            price, 
            stock,
            descriptions, 
            categoryId:category
        },
        {
            where:{id},
            returning:true
        })
            .then(data => {
                res.status(201).json(data[1])
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProduct(req, res, next){
        const { id } = req.params
  
        Product.destroy({where:{id}})
            .then(() => {
                res.status(200).json({"message":"Product Successfully Deleted"})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController