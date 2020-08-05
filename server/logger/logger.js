const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
    }),
    new transports.Console({
      level: "error",
    }),
  ],
});

module.exports = logger;
