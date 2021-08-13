const { User, Product, Cart } = require('../models')

class CartController {
    
    static showCart(req, res) {
        Cart.findAll({
            include:[
                {
                    model:Product,
                    order: [
                        ['name','asc']
                    ]
                }
            ],
            where: {
                userId: 1
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => [
            res.status(500).json(err)
        ])
    }

    static async addToCart(req, res, next) {
        const { id } = req.params
        try {
            const product = await Cart.findOne({where:{productId:id,userId:1}})

            if(product) {
                await Cart.increment('qty', {by: 1, where:{id:product.dataValues.id}})
            } else {
                await Cart.create({productId:id,userId:1, qty:1})
            }

            return res.status(200).json({"messsage" : "berihasil"})
        } catch (err) {
            return res.status(500).json(err)
        }

    }

    static add(req, res, next) {
        const { id } = req.params

        Cart.increment('qty', {by: 1, where:{id}})
        .then(() => {
            res.status(200).json({"message":"berihasil"})
        })
        .catch(err => [
            res.status(500).json(err)
        ])
    }

    static  async sub(req, res, next) {
        const { id } = req.params
        try {
            const decrement = await Cart.decrement('qty', {by: 1, where:{id}})

            if(decrement[0][0][0].qty <= 0) {
                await Cart.destroy({where:{id}})
            }
                
            return res.status(200).json({"message":"success"})
            
        } catch (error) {
            return res.status(500).json(err)
        }
    }

    static delete(req, res, next) {
        const { id } = req.params

        Cart.destroy({where:{id}})
            .then(() => {
                res.status(200).json({"message":"delete successfull"})
            })
            .catch(err => [
                res.status(500).json(err)
            ])
    }


}

module.exports = CartController