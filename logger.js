// logger.js
// Based with Winston

const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf, label, prettyPrint } = format;
const config = require('config');
const logger_config = config.get('logger');

const logConfiguration = {
    transports: [
        new winston.transports.Console(),
        new transports.File({
            filename: logger_config.file_name,
            level: logger_config.file_level,
        })
    ],
    format: winston.format.combine(
        winston.format.label({
            label: 'Label'
        }),
        winston.format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
       }),
        winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
    )
};

//const logCoswnfiguration = {
  //  format: combine(label({label:'main module'}), timestamp(), prettyPrint()),
    //'transports': [
       
      //  new transports.Console(),
        //new transports.File({
          //  filename: logger_config.file_name,
            //level: logger_config.file_level,
       // }),
    //],
    //format: winston.format.combine(
      //  winston.format.label({
        //    label: `Label🏷️`
       // }),
//};

const logger = createLogger(logConfiguration);

exports.logger = logger;
//exports.logger = require('./logger.js').logger;
//module.exports.logger = logger;

//new transports.Console({level: logger_config.console_level}),

logger.info('Hello, Winston!');