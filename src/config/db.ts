import mongoose from "mongoose";
import config from "./config";
import logger from "./logger";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(config.mongoose.url);
    logger.info(
      `Connected to MongoDB : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    logger.error("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;
