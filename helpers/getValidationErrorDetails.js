getValidationErrorDetails = (err) => {
  let errorDetails = err.errors.map((error) => error.message);
  return errorDetails;
};

module.exports = getValidationErrorDetails;
