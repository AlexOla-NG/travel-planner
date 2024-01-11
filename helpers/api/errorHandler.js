import ErrorResponse from "./errorResponse";

export { errorHandler };

// error handler middleware
// https://jasonwatmore.com/next-js-13-middleware-for-authentication-and-error-handling-on-api-routes
function errorHandler(err, res) {

  let error = { ...err };
  error.message = err.message;

  // custom application error
  if (typeof (err) === 'string') {
    const is404 = err.toLowerCase().endsWith('not found');
    const statusCode = is404 ? 404 : 400;
    error = new ErrorResponse(err, statusCode);
  }

  // jwt authentication error
  if (err.name === 'UnauthorizedError') {
    const message = `Invalid Token`;
    error = new ErrorResponse(message, 401);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  console.error(err);
  // default to 500 server error
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
}