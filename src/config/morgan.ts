import config from "./config";
import logger from "./logger";
const morgan = require("morgan");
// Define a custom token to extract the error message from the response
morgan.token("message", (req: any, res: any) => res.locals.errorMessage || "");

// Function to format the IP address based on the environment
const getIpFormat = (): string =>
  config.env === "production" ? ":remote-addr - " : "";

// Define log formats for successful and error responses
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

// Morgan middleware for logging successful responses
const successHandler = morgan(successResponseFormat, {
  skip: (req: any, res: any) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) },
});

// Morgan middleware for logging error responses
const errorHandler = morgan(errorResponseFormat, {
  skip: (req: any, res: any) => res.statusCode < 400,
  stream: { write: (message: string) => logger.error(message.trim()) },
});

// Export the handlers
export { successHandler, errorHandler };
