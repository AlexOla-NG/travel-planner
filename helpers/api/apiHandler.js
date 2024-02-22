import { connectMongoDB } from "@/libs/mongodb";
import { errorHandler } from "./errorHandler";
import { trim_string } from "./utils";

export { apiHandler };

// api routes middleware
// https://jasonwatmore.com/next-js-13-middleware-for-authentication-and-error-handling-on-api-routes
function apiHandler(handler) {

  return async (req, res) => {
    // connect to db
    await connectMongoDB()

    const method = req.method.toLowerCase();

    // check handler supports HTTP method
    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
      // remove whitespace from req.body values
      if(method === 'post' || method === 'put') {
        req.body = trim_string(req.body)
        await handler[method](req, res);
      }

      // route handler
      await handler[method](req, res);
    } catch (err) {
      // global error handler
      errorHandler(err, res);
    }
  }
}