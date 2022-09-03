const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
module.exports = {
  ROOT_PATH: path.resolve(__dirname, ".."),
  SERVICE_NAME: process.env.SERVICE_NAME,
  MONGODB_URL:
    process.env.MODE === "dev"
      ? process.env.MONGODB_URL
      : process.env.MONGODB_URL_PROD,
};
