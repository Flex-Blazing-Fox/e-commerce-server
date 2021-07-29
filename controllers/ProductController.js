const { Product, Product_Type, Type } = require('../models')
const { isProductUnique } = require('../helpers/validations')

class ProductController {
  static async getProducts(req, res, next) {
    try {
      const products = await Product.findAll({
        include: {
          model: Product_Type,
          include: Type,
        },
        order: ['createdAt'],
      })

      return res.status(200).json({ products })
    } catch (err) {
      next(err)
    }
  }

  static async getProduct(req, res, next) {
    try {
      const { id } = req.params
      const product = await Product.findOne({
        where: { id },
        include: {
          model: Product_Type,
          include: Type,
        },
      })

      if (!product) return next({ name: 'ProductNotFound' })

      return res.status(200).json({ product })
    } catch (err) {
      next(err)
    }
  }

  static async addProduct(req, res, next) {
    try {
      let { name, image_url, price, stock, type_name } = req.body

      const type = await Type.findOne({ where: { name: type_name } })

      if (!type) return next({ name: 'TypeNotFound' })

      const product = await Product.create({ name, image_url, price, stock })
      const product_type = await Product_Type.create({
        product_id: product.id,
        type_id: type.id,
      })

      return res.status(201).json({ product, type_name: type.name })
    } catch (err) {
      next(isProductUnique(err))
      next(err)
    }
  }

  static async editProduct(req, res, next) {
    try {
      const { id } = req.params
      let { name, image_url, price, stock, type_name } = req.body

      const type = await Type.findOne({ where: { name: type_name } })

      if (!type) return next({ name: 'TypeNotFound' })

      const product = await Product.update(
        { name, image_url, price, stock },
        { where: { id }, returning: true }
      )

      if (product[0] === 0) {
        return next({ name: 'ProductNotFound' })
      }

      await Product_Type.update(
        {
          type_id: type.id,
          product_id: product.id,
        },
        { where: { product_id: id } }
      )

      res.status(200).json({ product: product[1][0], type_name: type.name })
    } catch (err) {
      next(isProductUnique(err))
      next(err)
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params
      const rows = await Product.destroy({ where: { id } })
      if (!rows) return next({ name: 'ProductNotFound' })

      await Product_Type.destroy({ where: { product_id: id } })

      return res.status(200).json({ message: 'Product deleted' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ProductController
