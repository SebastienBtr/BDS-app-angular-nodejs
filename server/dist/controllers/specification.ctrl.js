'use strict';

var express = require('express');
var router = express.Router();

var specificationService = require('../services/specification.srv');

router.get('/specifications/:alloId', function (req, res) {

    console.log("call to get specifications for allo id");

    var alloId = req.params.alloId;

    specificationService.findWithAlloId(alloId, function (specs) {
        res.send(specs);
    }, function (error) {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching specifications for allo id' });
    });
});

router.get('/specification/:id', function (req, res) {

    console.log("call to get specification with id");

    var id = req.params.id;

    specificationService.findWithId(id, function (spec) {
        res.send(spec);
    }, function (error) {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching specification with id' });
    });
});

module.exports = router;
//# sourceMappingURL=specification.ctrl.js.map