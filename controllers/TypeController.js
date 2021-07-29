const { Type } = require('../models')
const { isTypeUnique } = require('../helpers/validations')

class TypeController {
  static async getTypes(req, res, next) {
    try {
      const types = await Type.findAll()

      res.status(200).json({ types })
    } catch (err) {
      next(err)
    }
  }

  static async getType(req, res, next) {
    try {
      const { id } = req.params
      const type = await Type.findOne({ where: { id } })

      if (!type) return next({ name: 'TypeNotFound' })

      return res.status(200).json({ type })
    } catch (err) {
      next(err)
    }
  }

  static async addType(req, res, next) {
    try {
      const { name } = req.body

      const type = await Type.create({ name })

      return res.status(201).json({ type })
    } catch (err) {
      next(isTypeUnique(err))
      next(err)
    }
  }

  static async editType(req, res, next) {
    try {
      const { id } = req.params
      const { name } = req.body
      const type = await Type.update(
        { name },
        {
          where: { id },
          returning: true,
        }
      )

      if (type[0] === 0) {
        return next({ name: 'TypeNotFound' })
      }

      return res.status(200).json({ type: type[1][0] })
    } catch (err) {
      next(isTypeUnique(err))
      next(err)
    }
  }

  static async deleteType(req, res, next) {
    try {
      const { id } = req.params
      const rows = await Type.destroy({ where: { id } })

      if (!rows) return next({ name: 'TypeNotFound' })

      return res.status(200).json({ message: 'Type deleted' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TypeController
