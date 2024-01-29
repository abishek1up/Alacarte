var appRoot = require("app-root-path");
var winston = require("winston");
require("dotenv").config();

var options = {
  file: {
    level: "info",
    filename: `${appRoot}/logs/app.log`,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint()
    ),
  },
  console: {
    level: "info",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
};

var logger = new winston.createLogger({
  level: "info",
  defaultMeta: {
    service: "Customer Management Service",
    timestamp: new Date().toLocaleString(),
  },
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "cyan",
  debug: "green",
});

module.exports = logger;
