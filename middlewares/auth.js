const jwt = require('jsonwebtoken')
const {User,Product, Cart} = require('../models')

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
                next()
            }
        })
        .catch(err => {
            next(err)
        })
    }
    catch(err) {
        next( {name: "Invalid access_token"})
    }
}

const authorization = (req, res, next) => {
    
    if(req.role !== 'admin') throw ( {name: "Accses Denied"})
    const {id} = req.params

	if (id) {
		Product.findOne({ where: {
            id
        }})
			.then((product) => {
                if(!product) throw ( {name: "Product Not Found"})
				req.product = product;
				next();
			})
			.catch((err) => next(err));
	} else {
		next();
	}
}

const authCustomerGeneral = (req, res, next) => {

    const userRole = req.currentUser.role

    if (userRole === 'customer') {
        next()
    } else {
        let error = {name: 'Not Authorised', message: 'You must be a customer to shop'}
        next(error)
    }

}

const authCustomerActions = (req, res, next) => {

    Cart.findByPk(+req.params.cartId)
        .then(cart => {
            if (!cart) {
                throw {
                    name: 'Not Found',
                    message: 'Cart not found'
                }
            } else {
                if (cart.userId !== req.currentUser.id) {
                    throw {
                        name: 'Not Authorised',
                        message: 'You do not have permission'
                    }
                } else {
                    next()
                }
            }
        })
        .catch(err => {
            next(err)
        })

}

module.exports = {authentication, authorization, authCustomerGeneral, authCustomerActions}