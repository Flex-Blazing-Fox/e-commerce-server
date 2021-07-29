const errorHandler = (err, req, res, next) => {
  let errors = []
  let statusCode

  switch (err.name) {
    case 'SequelizeValidationError':
      statusCode = 400
      err.errors.forEach((error) => {
        errors.push({
          status: statusCode,
          title: error.type,
          detail: error.message,
        })
      })
      break
      
    case 'InvalidEmail':
      statusCode = 400
      errors.push({
        status: statusCode,
        title: err.name,
        detail: err.detail,
      })
      break

    case 'IncorrectCredentialsError':
      statusCode = 400
      errors.push({
        status: statusCode,
        title: err.name,
        detail: 'Email or password is wrong',
      })
      break

    case 'UniqueProductError':
      statusCode = 400
      errors.push({
        status: statusCode,
        title: err.name,
        detail: 'Product already exists',
      })
      break

    case 'UniqueTypeError':
      statusCode = 400
      errors.push({
        status: statusCode,
        title: err.name,
        detail: 'Type already exists',
      })
      break

    case 'TypeNotFound':
      statusCode = 404
      errors.push({
        status: statusCode,
        title: err.name,
        detail: 'Type not found',
      })
      break

    case 'ProductNotFound':
      statusCode = 404
      errors.push({
        status: statusCode,
        title: err.name,
        detail: 'Product not found',
      })
      break

    default:
      statusCode = 500
      errors.push({
        status: statusCode,
        title: 'ServerError',
        detail: 'Internal server error',
      })
      break
  }

  res.status(statusCode).json({ errors })
}

module.exports = errorHandler
