const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static register(req, res, next) {
        // res.status(201).json({ success: true, message : "User Created" })
        const { email, password, role} = req.body
        
        User.create({ email, password, role})
        .then((user) => {
            res.status(201).json({ success: true, message : "User Created" })
        })
        .catch((err) => {
            next(err)
        })
    }

    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({
            where: {email}
        })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const payload = {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
                const access_token = jwt.sign(payload, process.env.JWT_KEY)
                res.status(200).json({success:true, access_token})
            } else {
                throw {
                    name: "Email or Password is wrong"
                }
            }
        })
        .catch((err) => {
            next(err)
        })
    }
}

module.exports = UserController