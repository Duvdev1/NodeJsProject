//const sqlite3 = require('sqlite3');
const knex = require('knex');
const config = require('config');
const db_conn_config = config.get('db_conn');
const logger = require("./logger").logger;

logger.debug(db_conn_config.client);
// connector to the db by knex connector
var filename = db_conn_config.filename;
var client = db_conn_config.client;
const connectdKenex = knex({
    client: client,
    version: db_conn_config.version,
    connections: {
        filename: filename,
    },
});
logger.debug(connectdKenex);
module.exports = connectdKenex;
//module.exports.connectdKenex = connectdKenex;