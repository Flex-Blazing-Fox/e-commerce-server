const errHandler = (err, req, res, next)=>{
    let statusCode
    let errorMessage
    switch(err.name){
        case'ACCESS_DENIED' : 
            statusCode = 404
            errorMessage = {message: "Access Denied"}
            break
        case'PRODUCT_NOT_FOUND' : 
            statusCode = 404
            errorMessage = {message: "Product Not Found"}
            break
        case'SequelizeValidationError' : 
            statusCode = 400
            errorMessage = {message: err.errors[0].message}
            break
        case'SequelizeUniqueConstraintError' : 
            statusCode = 400
            errorMessage = {message: 'Email already registered'}
            break
        case'LOGIN_FAILED' : 
            statusCode = 401
            errorMessage = {message: 'Invalid email/password'}
            break
        case'NOT_LOGIN' : 
            statusCode = 401
            errorMessage = {message: 'Please Login First'}
            break
        case'INVALID_TOKEN' : 
            statusCode = 401
            errorMessage = {message: 'Invalid Access Token'}
            break
        default :
            statusCode = 500
            errorMessage = {message: err}
            break
    }

    res.status(statusCode).json(errorMessage)
}

module.exports = errHandler