const { Product } = require('../models');

class ProductController{
    static addProduct(req, res, next) {
        const { name, image_url, price, stock } = req.body;
    
        Product.create({ name, image_url, price, stock })
        .then((product) => {
            res.status(201).json({ data: product });
          })
          .catch((err) => {
            next(err);
          });
    }

    static getAllProduct(req, res, next) {
        Product.findAll()
        .then((products) => {
            
            res.status(200).json({ data: products });
          })
          .catch((err) => {
            next(err);
          });
    }

    static getProductById(req, res, next) {
        const {id} = req.params

        Product.findOne({where: {id}})
        .then((products) => {
          res.status(200).json({ data: products });
        })
        .catch((err)=> {
          next(err);
        })
    }

    static editProduct(req, res, next) {
        const { product } = req;
        const { name, image_url, price, stock } = req.body;
        product.name = name;
        product.image_url = image_url;
        product.price = price;
        product.stock = stock;
        product.save()
        .then((updatedProduct) => {
          res.status(200).json({ data: updatedProduct });
        })
        .catch((err) => {
          next(err);
        });
    }

    static deleteProduct(req, res, next) {
        const { product } = req;
        product.destroy()
        .then(() => {
          res.status(200).json({ message: 'Product has been deleted' });
        })
        .catch((err) => {
          next(err);
        });
    }
}

module.exports = ProductController