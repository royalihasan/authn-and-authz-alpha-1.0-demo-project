import express, { Application, Request, Response, NextFunction } from "express";
import ApiError from "./utils/ApiError";
import httpStatus from "http-status";
import { errorHandler } from "./config/morgan";
import { errorConverter } from "./middlewares/error";
import config from "./config/config";

const cors = require("cors");
const helmet = require("helmet");

const morgan = require("./config/morgan");
const app: Application = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export { app };
