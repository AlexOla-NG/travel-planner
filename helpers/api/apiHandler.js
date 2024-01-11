import { errorHandler } from "./errorHandler";

export { apiHandler };

// api routes middleware
// https://jasonwatmore.com/next-js-13-middleware-for-authentication-and-error-handling-on-api-routes
function apiHandler(handler) {
  return async (req, res) => {
    const method = req.method.toLowerCase();

    // check handler supports HTTP method
    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
      // route handler
      await handler[method](req, res);
    } catch (err) {
      // global error handler
      errorHandler(err, res);
    }
  }
}