import ErrorResponse from '../utils/errorResponse.js';

/**
 * Custom error handler for Express applications.
 *
 * @param {Error} err - The error object.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 *
 * @throws {Error} - Throws an error if the error handler encounters an unexpected scenario.
 *
 * @example
 * // Usage of errorHandler in an Express application
 * import express from 'express';
 * import errorHandler from './path/to/errorHandler'; // Adjust the path accordingly
 *
 * const app = express();
 *
 * // Error handler middleware
 * app.use(errorHandler);
 *
 * // Example route that triggers an error
 * app.get('/error-route', (req, res, next) => {
 *   const error = new Error('This is a sample error');
 *   next(error);
 * });
 */
const errorHandler = (err, req, res, next) => {
	console.log(err);

	let error = { ...err };
	error.message = err.message;

	// STUB: Mongoose bad ObjectId
	if (err.name === 'CastError') {
		const message = `Resource not found with id of ${err.value}`;
		error = new ErrorResponse(message, 404);
	}

	// STUB: Mongoose duplicate key
	if (err.code === 11000) {
		const message = 'Duplicate field value entered';
		error = new ErrorResponse(message, 400);
	}

	// STUB: Mongoose validation error
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorResponse(message, 400);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'Server Error',
	});
};

export default errorHandler;