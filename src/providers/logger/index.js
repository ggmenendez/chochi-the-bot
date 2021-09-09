const winston = require('winston');
const { combine, printf, timestamp } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);

const logger = winston.createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [new winston.transports.Console()]
});

module.exports = logger;
