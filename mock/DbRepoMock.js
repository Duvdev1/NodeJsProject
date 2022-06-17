

// get all reports form the table
function get_all_reports(){
    return "get_all_reports";
}

// get a report by id from the table
function get_report_by_id (id){
    return "get_report_by_id";
}

// add a new report to the table
function add_Report(report){
    return "add_Report";
}

// update a report detalis in the table
function update_report_by_id (id, report){
    return "update_report_by_id";
}

// delete a report from the table
function delete_report_by_id (id){
    return "delete_report_by_id";
}

// get reports by a condition
function get_reports_by_condition(column, value){
    return "get_reports_by_condition";
}

module.exports = {
    get_all_reports,
    get_report_by_id,
    add_Report,
    update_report_by_id,
    delete_report_by_id,
    get_reports_by_condition
};