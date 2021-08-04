const errorHandler = (err, req, res, next) => {
    let statusCode;
    let errors = []

    // console.log(err.name)
    switch(err.name) {
      case 'SequelizeValidationError':
        statusCode = 400;
        errors = err.errors ? err.errors.map((el) => el.message) : err.message;
        break;
      case 'Task can not be null':
        statusCode = 400;
        errors.push('Task can not be null');
        break;
      case 'Email or Password is wrong':
        statusCode = 401;
        errors.push('Email or Password is wrong');
        break;
      case 'Missing access token':
        statusCode = 401;
        errors.push('Missing access token');
        break;
      case 'Invalid access_token':
        statusCode = 401;
        errors.push('Invalid access token');
        break;
      case 'Task Not Found':
        statusCode = 404;
        errors.push('Task not found');
        break;
      case 'JsonWebTokenError':
        statusCode = 404;
        errors.push('User not found');
        break;
      case 'SequelizeUniqueConstraintError':
        statusCode = 409;
        errors.push('Email has been used');
        break;
      case 'Accses Denied':
        statusCode = 500;
        errors.push('Accses Denied');
        break;
      default:
        statusCode = 500;
        errors.push('Internal server error');
    }
    res.status(statusCode).json({ errors });
}


module.exports = errorHandler