'use strict'

const { User, Product, Cart } = require('../models')

class CartController {
    static addToCart (req, res, next) {
        let currentStock = 0
        let qtyToDeduct = 0
        let productname = ''

        Product.findOne({where: {id: +req.params.productId}})
        .then(product => {
            if (!product) {
                throw {
                    name: 'Not Found',
                    message: 'Product not found'
                }
            } else {
                currentStock = product.stock
                productname = product.name
                if (product.stock >= +req.body.quantity) {
                    return Cart.findOne({
                        where: {
                            userId: +req.currentUser.id,
                            productId: +req.params.productId
                        }
                    })
                } else {
                    throw{
                        name: 'Conflicted',
                        message: 'Not enough stock'
                    }
                }
            }
        })
        .then(cart => {
            if (!cart) {
                qtyToDeduct += req.body.quantity
                return Cart.create({
                    userId: +req.currentUser.id,
                    productId: +req.params.productId,
                    quantity: req.body.quantity
                })
            } else {
                qtyToDeduct += req.body.quantity
                return Cart.update(
                    {quantity: +cart.quantity + +req.body.quantity},
                    {where: {
                        userId: +req.currentUser.id,
                        productId: +req.params.productId
                    }}
                )
            }
        })
        .then(currentCart => {
            res.status(201).json({message: `${+qtyToDeduct} ${productname} added to cart`})
        })
        .catch(err => {
            next(err)
        })
    }

    static displayCart (req, res, next) {
        Cart.findAll({
            where: {userId: +req.currentUser.id},
            include: [{model: Product}, {model: User}]
        })
        .then(carts => {
            res.status(200).json({ cart: carts})
        })
        .catch(err => {
            next(err)
        })
    }

    static patchQuantity (req, res, next) {
        Cart.findOne({
            where: {id: +req.params.cartId},
            include: [{model: Product}, {model: User}]
        })
        .then(cart => {
            if (cart.Product.stock >= +req.body.newQuantity) {
                return Cart.update(
                    {quantity: +req.body.newQuantity},
                    {returning: true, where: {id: +req.params.cartId}}
                )
            } else {
                throw {
                    name: 'Conflicted',
                    message: 'Not enough stock'
                }
            }
        })
        .then(updateCart => {
            if (updateCart[0] !==1) {
                throw {
                    name: 'Conflicted',
                    message: 'Nithing updated'
                }
            } else {
                res.status(200).json({message: `Quantity updated to ${req.body.newQuantity}`})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static removeCart (req, res, next) {
        Cart.destroy({where: {id: +req.params.cartId}})
        .then(response => {
            res.status(200).json({message: 'Successfully deleted'})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CartController