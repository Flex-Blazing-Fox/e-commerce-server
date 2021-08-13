const {User, Cart, Product, Transaction} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const midtransClient = require('midtrans-client');


class CustController{
    static googleSignIn(req, res, next){
        const {token} = req.body
        let email
        const password = `GOO${Math.random()*Number(process.env.DEFAULT_PASSWORD)}`
        let status = 200
        client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket=>{
            email = ticket.payload.email
            return User.findOne({
                where: {email}
            })
        })
        .then(user=>{
            if(user) return user
            status = 201
            return User.create({email, password, role: 'Customer'})
        })
        .then(result=>{
            const payload = {
                user_id: result.id
            }
            const access_token = jwt.sign(payload, process.env.JWT_SECRET)
            res.status(status).json({message: 'Login Success', access_token})
        })
        .catch(err=>{
            next(err)
        })
    }
    static register(req, res, next){
        const {email, password} = req.body
        User.create({
            email,
            password,
            role: 'Customer'   
        })
        .then(result=>{
            res.status(201).json({message: 'Successfully Register', email: result.email})
        })
        .catch(err=>{
            next(err)
        })
    }
    static login(req, res, next){
        const {email, password} = req.body
        User.findOne({
            where: {
                email,
                role: 'Customer'
            }
        })
        .then(result=>{
            const compare = bcrypt.compareSync(password, result.password)
            if(compare){
                const payload = {
                    userId: result.id
                }
                const access_token = jwt.sign(payload, process.env.JWT_SECRET)
                res.status(200).json({custToken: access_token})
            }else{
                throw{name: 'LOGIN_FAILED'}
            }
        })
        .catch(err=>{
            next({name: 'LOGIN_FAILED'})
        })
    }
    static addCart(req, res, next){
        const {productId, qty} = req.body
        const custId = req.cust.id
        let statusCode = 201
        let getProduct
        Product.findOne({
            where: {
                id: productId
            }
        })
        .then(result=>{
            getProduct = result
            return Cart.findAll({
                where: {
                    custId,
                    productId
                },
                include: [
                    {model: Product}
                ]
            })
        })
        
        .then(data=>{
            if(data.length<1){
                return Cart.create({productId, custId, qty, total_price: getProduct.price})
            }else{
                statusCode = 200
                let newQty = +qty + data[0].qty
                let newPrice = +getProduct.price + data[0].total_price
                return Cart.update({
                    qty: newQty,
                    total_price: newPrice
                }, {
                    where: {
                        id: data[0].id
                    },
                    returning: true
                })
            }
        })
        .then((result)=>{
            if(statusCode===201) res.status(statusCode).json({cart: result})
            else res.status(statusCode).json({cart: result[1][0]})
        })
        .catch(err=>{
            next(err)
        })
    }
    static getCart(req, res, next){
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
            res.status(200).json({cart: result})
        })
        .catch(err=>{
            next(err)
        })
    }
    static checkout(req, res, next){
        const custId = req.cust.id
        const cart = req.cart
        let continue_prosess = true
        for(let i in cart){
            let newStok
            Product.findOne({
                where: {
                    id: cart[i].productId
                }
            })
            .then(result=>{
                newStok = result.stock - cart[i].qty
                if(newStok<0){
                    continue_prosess = false
                    next({message: `stok '${cart[i].Product.name}' tidak cukup`})
                }
            })
        }
        if(continue_prosess){
            Transaction.create({
                custId,
                status: 'Menunggu Pembayaran'
            })
            .then((result)=>{
                req.transaction = result
                return Cart.destroy({
                    where: {
                        custId
                    }
                })
            })
            .then(()=>{
                for(let i in cart){
                    let newStok
                    Product.findOne({
                        where: {
                            id: cart[i].productId
                        }
                    })
                    .then(result=>{
                        newStok = result.stock - cart[i].qty
                        return Product.update({
                            stock: newStok
                        },{
                            where: {
                                id: cart[i].productId
                            },
                            returning: true
                        })
                    })
                }
                next()
            })
            .catch(err=>{
                next(err)
            })
        }
    }
    static midtrans(req, res, next){
        const transaction = req.transaction
        const cust = req.cust
        // Create Snap API instance
        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : process.env.SERVERKEY
        });
        let parameter = {
            "transaction_details": {
                "order_id": transaction.id,
                "gross_amount": 10000
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "first_name": "Abdul",
                "last_name": cust.role,
                "email": cust.email,
                "phone": "08111222333"
            }
        };
        snap.createTransaction(parameter)
            .then((transaction)=>{
                // transaction token
                const transactionToken = transaction.token;
                const redirect_url = transaction.redirect_url
                res.status(200).json({transactionToken, redirect_url})
            })
            .catch(err=>{
                next(err);
            })
    }
}

module.exports = CustController