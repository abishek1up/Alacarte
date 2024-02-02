const app = require("./app/index");
const http = require("http");
const connectMongo = require("./app/config/database");
require("dotenv").config();
const { logger } = require("./app/config/winston");
const server = http.createServer(app);

if (process.env.NODE_ENV == "prod") {
  const IP_ADDRESS = process.env.IP_ADDRESS || "0.0.0.0";
  const PORT = +process.env.PORT || 7777;
  logger.info("IP Address:" + IP_ADDRESS + ", Port:" + PORT);
  logger.info("Production Environment Connected");
  Promise.all([connectMongo()])
    .then((results) => {
      logger.info("Mongo, Customer DB Connected");
      server.listen(PORT, IP_ADDRESS, function (err) {
        if (err) logger.error("Could not listen " + err);
        return;
      });
      logger.info("Working on PORT - " + PORT);
    })
    .catch((err) => {
      logger.error("Failed to connect DB " + err);
      process.exit(-1);
    });
} else if (process.env.NODE_ENV == "test") {
  const IP_ADDRESS = process.env.IP_ADDRESS || "0.0.0.0";
  const PORT = +process.env.PORT || 7777;
  logger.info("IP Address:" + IP_ADDRESS + ", Port:" + PORT);
  logger.info("TEST Environment Connected");

  Promise.all([connectMongo()])
    .then((results) => {
      logger.info("Mongo, Customer DB Connected");
      server.listen(PORT, IP_ADDRESS, function (err) {
        if (err) console.error("Could not listen ", err);
        return;
      });
      logger.info("Working on PORT - " + PORT);
    })
    .catch((err) => {
      logger.error("Failed to connect DB ", err);
      process.exit(-1);
    });
}

module.exports = server;
