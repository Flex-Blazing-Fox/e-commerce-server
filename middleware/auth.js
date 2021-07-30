const { User } = require('../models')
const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    
    if(!req.headers.access_token){
        throw {name:"NOT_LOGIN"}
    }

    try{
        const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET_KEY)
        req.userId = decoded.id

        User.findOne({
            where:{id:decoded.id}
        })
            .then(result => {
                
                if(result){
                    req.user = result

                    next()
                }else {
                    throw {name:"USER_DATA_NOT_FOUND"}
                }
            })
            .catch(err => {
                next(err)
            })
    }
    catch(err){
        throw {name:"INVALID_TOKEN"}
    }
}

const authorization = (req, res, next) => {
    if(req.user.role !== 'admin') {
        throw {name: "UNAUTHORIZED"}
    }
    next()
}

module.exports = { authentication, authorization }