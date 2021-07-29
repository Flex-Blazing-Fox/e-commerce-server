const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class AdminController {
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
      next(err)
    }
  }
}

module.exports = AdminController
