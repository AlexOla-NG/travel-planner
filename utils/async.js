/**
 * A wrapper function that resolves all promises in the request-response cycle.
 *
 * @param {Function} fn - The function to wrap, which handles the asynchronous logic.
 * @returns {Function} - A function that returns a Promise resolving to the wrapped function.
 *
 * @throws {Error} - Throws an error if the wrapped function throws an exception.
 *
 * @example
 * // Usage of asyncHandler with an asynchronous function
 * const asyncHandler = require('./asyncHandler'); // Assuming the module is in the same directory
 *
 * const wrappedAsyncFunction = asyncHandler(async (req, res, next) => {
 *   // Asynchronous logic here
 *   const result = await someAsyncOperation();
 *   res.json({ result });
 * });
 *
 * // Using the wrapped function in a route handler
 * app.get('/some-route', wrappedAsyncFunction);
 */
const asyncHandler = (fn) => (req, res, next) =>
	Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;