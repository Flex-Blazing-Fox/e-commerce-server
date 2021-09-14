const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class CustomerControler {
  static async login(req, res, next) {
    const { email, password } = req.body

    try {
      const user = await User.findOne({ where: { email } })

      if (!user) {
        return next({
          name: 'IncorrectCredentialsError',
        })
      }

      let isPasswordCorrect = bcrypt.compareSync(password, user.password)

      if (!isPasswordCorrect) {
        return next({
          name: 'IncorrectCredentialsError',
        })
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      }
      const access_token = jwt.sign(payload, process.env.TOKEN_SECRET)

      return res.status(200).json({ jwt: access_token, user: payload })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password } = req.body

      const user = await User.create({ email, password })
      
      return res.status(201).json({
        id: user.id,
        email: user.email,
        role: user.role
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CustomerControler