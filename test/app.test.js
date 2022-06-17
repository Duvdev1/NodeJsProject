const supertest = require("supertest");
const should = require("should");
const expect = require("chai").expect;
const { assert } = require("chai");
const { json } = require("express");
const axios = require('axios').default;

const server = supertest.agent("localhost:8088");
describe('Test REST api app.js', () => {
    it('testing GET get_all_reports', done => {
        server.get('/reports').end((err, res) => {
            res.status.should.equal(200);
            res.body.reports_.should.equal('get_all_reports');
            done();
        });
    });
    it('testing GET get_report_by_id', done => {
        server.get('/reports/2')
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.report.should.equal('get_report_by_id');
            done();
        });
    });
    it('testing POST add_Report', done => {
        server.post('/reports')
        .end((err, res) => {
            res.status.should.equal(201);
            res.body.res.should.equal('success');
            res.body.url.should.equal('localhost:8088/reports/[object Object]');
            res.body.add.should.equal('add_Report');
            done();
        });
    });
    it('testing PUT update_report_by_id', done => {
        server.put('/reports/1')
        .end((err, res) => {
            res.status.should.equal(201);
            res.body.res.should.equal('success');
            res.body.url.should.equal('localhost:8088/reports/[object Object]');
            res.body.update.should.equal('update_report_by_id');
            done();
        });
    });
    it('testing DELETE delete_report_by_id', done => {
        server.delete('/reports/9999')
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.res.should.equal('success');
            res.body.url.should.equal('localhost:8088/reports/[object Object]');
            res.body.delete_res.should.equal('delete_report_by_id');
            done();
        });
    });
});
