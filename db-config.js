const knex = require('knex');
const config = require('./knexfile.js');
const logger = require('./logger').logger;
const db = knex(config.report);

module.exports = {
    get_all_reports,
    get_report_by_id,
    add_Report,
    update_report_by_id,
    delete_report_by_id,
    get_reports_by_condition
};
// get all reports form the table
function get_all_reports(){
    logger.info('get all reports from db');
    return db("reports").select("*");
}

// get a report by id from the table
function get_report_by_id (id){
    logger.info('get report by id');
    return db("reports").select("*").where("id", id).first();
}

// add a new report to the table
function add_Report(report){
    logger.info('add a new report to the db');
    return db("reports").insert(report);
}

// update a report detalis in the table
function update_report_by_id (id, report){
    logger.info('update report detalis by id in the db');
    return db("reports").where("id", id).update(report);
}

// delete a report from the table
function delete_report_by_id (id){
    logger.info('delete a report by id from the dbs');
    return db("reports").where("id", id).del();
}

// get reports by a condition
function get_reports_by_condition(column, value){
    logger.info('get reports by condition');
    return db("reports").select('*').where(column, value);

}