const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `./${process.env.NODE_ENV}.env`),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "dev",
  HOST: process.env.HOST || "localhost",
  FRONTEND_URL: process.env.FRONTEND_URL,
  BACKEND_URL: process.env.BACKEND_URL,
  PORT: process.env.PORT || 3000,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_SENDER: process.env.SENDGRID_SENDER,
  SENDGRID_USER: process.env.SENDGRID_USER,
  MONGO_URL: process.env.MONGO_URL,
  JWT_KEY: process.env.JWT_SECRET_KEY,
  JWT_ACCESS_EXP: process.env.JWT_ACCESS_EXP,
  JWT_REFRESH_EXP: process.env.JWT_REFRESH_EXP,
  AWS_S3_ID: process.env.PUBLIC_AWS_S3_ID,
  AWS_S3_SECRET_KEY: process.env.PUBLIC_AWS_S3_SECRET_KEY,
  PUBLIC_AWS_S3_BUCKET_NAME: process.env.PUBLIC_AWS_S3_BUCKET_NAME,
  S3_URL: process.env.S3_URL,
  RABBITMQ_BROKER_LINK: process.env.RABBITMQ_BROKER_LINK,
};
