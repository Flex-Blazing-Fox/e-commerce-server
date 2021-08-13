const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController{
    static login(req, res, next){
        const { email, password } = req.body

        User.findOne({where:{email}})
            .then((user) => {
                if(user && bcrypt.compareSync(password, user.password)){
                    const payload = {
                        id: user.id,
                        email: user.email,
                        role: user.role
                    }

                    const access_token = jwt.sign(payload, process.env.JWT_SECRET_KEY)

                    res.status(200).json({access_token})
                }else {
                    throw {name:"LOGIN_FAILED"}
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController