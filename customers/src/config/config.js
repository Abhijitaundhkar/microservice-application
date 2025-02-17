const dotEnvFlow = require("dotenv-flow");

process.env.NODE_ENV = process.env.NODE_ENV || "development"; // Fallback to "development"

dotEnvFlow.config();
module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
};
