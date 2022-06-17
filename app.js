// app api
const express = require("express");
const path = require("path");
const logger = require("./logger").logger;
const {get_dbrepo} = require('./getdbRepo');
const config = require('config');
const mode = config.get('mode');
const dbrepo = get_dbrepo(mode.mode);

logger.info("start the system");

const port = 8088;
const app = express();

// server static page
app.use(express.static(path.join(__dirname,  'index.html')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// swagger part
var swagger_ui = require('swagger-ui-express');
var swagger_doc = require('./swagger.json');

app.use('/api-docs', swagger_ui.serve, swagger_ui.setup(swagger_doc));

//go to static page and get all the reports from the db
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// get from /reports -> get all reports or by speed parameter
app.get('/reports', async(req, res) => {
    const speed = req.query.speed;
    logger.info('Check if the user enter speed')
    logger.debug(speed);
    if (speed) {
        logger.debug(isNaN(Number(speed)));
        if (isNaN(Number(speed))){
            logger.error('The speed in the body is not a number');
            const answer = '${speed} is not a number';
            res.status(400).json({answer});
            return;
        } 
        else {
            logger.info('get all reports with the same speed');
            const reports = await dbrepo.get_reports_by_condition('speed', speed);
            res.status(200).json({reports});
            return;
        }
    }
    logger.info('get all reports');
    const reports_ = await dbrepo.get_all_reports();
    logger.debug(reports_);
    res.status(200).json({reports_});
});

// get by id a report
app.get('/reports/:id', async(req, res) => {
    logger.info('get a report by id');
    const reportid = req.params.id;
    logger.debug({reportid});
    const report = await dbrepo.get_report_by_id(reportid);
    logger.debug({report});
    res.status(200).json({report});
});

// add a report to the db
app.post('/reports', async (req, res) => {
    logger.debug('try to add a new report');
    try {
        const new_report = req.body;
        logger.debug(new_report);
        const add = await dbrepo.add_Report(new_report);
        logger.debug('report has been added');
        res.status(201).json({
            res: 'success',
            url: ('localhost:8088/reports/' + {add:0}),
            add
        });
    }
    catch(e){
        logger.error('an error occured while trying to added a new report -'+ {e});
        res.status(400).send({
            status: 'falied',
            message: e.message
        });
    }
});

// update a report by id
app.put('/reports/:id', async(req, res) => {
    logger.debug('try to update a report');
    try {
        const report_id = req.params.id;
        const report = req.body;
        logger.debug(report);
        const update = await dbrepo.update_report_by_id(report_id, new_report);
        logger.debug('the report has been updated');
        res.status(201).json({
            res: 'success',
            url: ('localhost:8088/reports/' + {report_id}),
            update
        });
    }
    catch(e){
        logger.error('an error occured while trying to updated a report -' + {e});
        res.status(400).send({
            status: 'failed',
            message: e.message
        });
    }
});

// delete report by id
app.delete('/reports/:id', async(req, res) => {
    logger.debug('delete a report by id');
    try {
        const report_id = req.params.id;
        logger.debug(report_id);
        const delete_res = await dbrepo.delete_report_by_id(report_id);
        logger.debug('report has been deleted');
        res.status(200).json({
            res: 'success',
            url: ('localhost:8088/reports/' + {report_id}),
            delete_res
        });
    }
    catch(e){
        logger.error('an error occured while trying to delete a report -' + {e});
        res.status(400).send({
            status: 'falied',
            message: e.message
        });
    }
});

app.listen(port, () => console.log('listening to port'+ {port}));

module.exports = app;

