const { User } = require('../models')
const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.access_token) {
      return next({ name: 'MissingAccessToken' })
    }

    const { access_token } = req.headers
    const decodedUser = jwt.verify(access_token, process.env.TOKEN_SECRET)

    const user = await User.findByPk(decodedUser.id)

    req.user = user

    next()
  } catch (err) {
    return next({ name: 'AuthenticationError' })
  }
}

const authorize = async (req, res, next) => {
  if (req.user.role !== 'admin') return next({ name: 'Unauthorized' })

  next()
}

module.exports = { authenticate, authorize }