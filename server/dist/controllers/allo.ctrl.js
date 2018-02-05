'use strict';

var express = require('express');
var router = express.Router();

var alloService = require('../services/allo.srv.js');

router.get('/all-allo', function (req, res) {

    console.log("call to get all allo");

    alloService.findAll(function (orders) {
        res.send(orders);
    }, function (error) {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching allos' });
    });
});

router.get('/allo-active', function (req, res) {

    console.log("call to get allo active");

    alloService.findActive(function (orders) {
        res.send(orders);
    }, function (error) {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching allos active' });
    });
});

router.get('/allo-active/:id', function (req, res) {

    console.log("call to get allo active for id");

    var id = req.params.id;

    alloService.findActiveWithId(id, function (orders) {
        res.send(orders);
    }, function (error) {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching allo active for id' });
    });
});

router.get('/allo/:id', function (req, res) {

    console.log("call to get allo for id");

    var id = req.params.id;

    alloService.findWithId(id, function (orders) {
        res.send(orders);
    }, function (error) {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching allo for id' });
    });
});

router.post('/update-active-allo/:id', function (req, res) {

    console.log("call to update active allo");

    var id = req.params.id;
    console.log(req.body.state);
    var state = req.body.state ? 1 : 0;

    alloService.updateActive(id, state, function () {
        res.end();
    }, function (error) {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when updating allo active' });
    });
});

module.exports = router;
//# sourceMappingURL=allo.ctrl.js.map