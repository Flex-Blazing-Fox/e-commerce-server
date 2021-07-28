const errorHandler = (err, req, res, next) => {
  let statusCode,
    error = [];
  switch (err.name) {
    case "EMAIL / PASSWORD AUTHENTICATION FAIL":
      statusCode = 401;
      error.push(
        "Email or password combination can't be found"
      );
      break;
    case "INVALID TOKEN / TOKEN NOT EXIST":
      statusCode = 401;
      error.push("Token is not exist or invalid token");
      break;
    case "TASK NOT FOUND / AUTHORIZED":
      statusCode = 404;
      error.push(`Task with id ${err.id} is not found / authorized`);
      break;
    case "SEQUELIZE VALIDATION ERROR":
      statusCode = 400;
      err.details.forEach((detail) => error.push(detail));
      break;
    case "UPDATE METHOD NEED ALL DATA":
      statusCode = 400;
      error.push(
        "All data (title, description, status, and due date) must be provided"
      );
      break;
    default:
      statusCode = 500;
      error.push("Internal server error");
  }
  res.status(statusCode).json({ error });
};

module.exports = errorHandler;
